import { SizeCategory, SizeThresholds, WhatsAppTemplates, GarmentPreference, FitPreference, PalettePreference } from "./types";

export function calculateNoxaSize(
  heightCm: number,
  weightKg: number,
  usualSize: string,
  fitPreference: FitPreference,
  thresholds: SizeThresholds
): SizeCategory {
  // Base size based on weight thresholds
  let calculated: SizeCategory = "L";

  if (weightKg > thresholds.xxxlMaxWeight) {
    calculated = "4XL";
  } else if (weightKg > thresholds.xxlMaxWeight) {
    calculated = "3XL";
  } else if (weightKg > thresholds.xlMaxWeight) {
    calculated = "2XL";
  } else if (weightKg > thresholds.lMaxWeight) {
    calculated = "XL";
  } else {
    calculated = "L";
  }

  // Factor in height: very tall (>= 188cm) with medium weight may need higher size for torso length
  if (heightCm >= 190 && weightKg >= 84 && calculated === "L") {
    calculated = "XL";
  } else if (heightCm >= 195 && weightKg >= 95 && calculated === "XL") {
    calculated = "2XL";
  }

  // Factor in fit preference: "Relajada y fresca" can nudge up if at the upper boundary
  const sizeOrder: SizeCategory[] = ["L", "XL", "2XL", "3XL", "4XL"];
  const currentIndex = sizeOrder.indexOf(calculated);

  if (fitPreference === "Relajada y fresca" && currentIndex < sizeOrder.length - 1) {
    // Check if close to upper boundary of current tier
    const isUpperBoundary =
      (calculated === "L" && weightKg >= thresholds.lMaxWeight - 3) ||
      (calculated === "XL" && weightKg >= thresholds.xlMaxWeight - 3) ||
      (calculated === "2XL" && weightKg >= thresholds.xxlMaxWeight - 3) ||
      (calculated === "3XL" && weightKg >= thresholds.xxxlMaxWeight - 3);

    if (isUpperBoundary) {
      calculated = sizeOrder[currentIndex + 1];
    }
  }

  // Cross-reference with usual size if valid
  if (usualSize && usualSize !== "No estoy seguro") {
    const usualIndex = sizeOrder.indexOf(usualSize as SizeCategory);
    if (usualIndex !== -1) {
      // If calculated is more than 1 step away from usual, bridge the gap safely
      if (Math.abs(usualIndex - currentIndex) >= 2) {
        // give weight to anatomy but soften variance
        calculated = sizeOrder[Math.round((usualIndex + currentIndex) / 2)];
      }
    }
  }

  return calculated;
}

export function buildWhatsAppLink(params: {
  phone: string;
  interest: GarmentPreference;
  name: string;
  city: string;
  size: SizeCategory;
  fitPreference: FitPreference;
  palette: PalettePreference;
  heightCm: number;
  weightKg: number;
  templates: WhatsAppTemplates;
}): string {
  const { phone, interest, name, city, size, fitPreference, palette, heightCm, weightKg, templates } = params;

  let template = templates.general;
  if (interest === "Bóxers") {
    template = templates.boxers;
  } else if (interest === "Regalo") {
    template = templates.regalo;
  }

  const message = template
    .replace(/{nombre}/g, name || "Cliente")
    .replace(/{ciudad}/g, city || "Colombia")
    .replace(/{talla}/g, size)
    .replace(/{prenda}/g, interest)
    .replace(/{caida}/g, fitPreference)
    .replace(/{paleta}/g, palette)
    .replace(/{estatura}/g, heightCm.toString())
    .replace(/{peso}/g, weightKg.toString());

  const encoded = encodeURIComponent(message);
  const cleanPhone = phone.replace(/[^0-9]/g, "");

  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
