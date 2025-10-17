// Blood Hunter Crimson Rite Module

Hooks.once("init", () => {
  console.log("Blood Hunter Crimson Rite module loaded.");
});

// Hook into actor updates to automatically remove Crimson Rites on rest
Hooks.on("preUpdateActor", async (actor, update, options, userId) => {
  // Only run for Blood Hunter actors
  if (!actor.hasPlayerOwner) return;

  // Optional: Filter by actor ID if you want to target only your character
  // if (actor.id !== "KlL2oDSwDxzlicxt") return;

  // Detect short/long rest
  const restUpdate = getProperty(update, "system.attributes.rest") || getProperty(update, "flags.dnd5e.resting");
  if (!restUpdate) return;

  // Delete all Crimson Rites
  const rites = actor.effects.filter(e => e.name.startsWith("Crimson Rite:"));
  for (let e of rites) await e.delete();

  if (rites.length) {
    ui.notifications.info(`${actor.name}'s Crimson Rites cleared due to rest.`);
  }
});
