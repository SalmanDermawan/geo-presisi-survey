import prisma from "./prisma";

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  
  // Convert array of {key, value} to object
  const settingsObj: Record<string, string> = {};
  for (const s of settings) {
    settingsObj[s.key] = s.value;
  }
  
  return settingsObj;
}
