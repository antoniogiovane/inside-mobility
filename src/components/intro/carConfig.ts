// =========================================================
//  CONFIG AUTO 3D — adatta questi valori al tuo file car.glb
//  Metti il modello in:  public/models/car.glb
//  Al primo avvio, apri la Console del browser: viene stampato
//  l'elenco dei nomi dei nodi e delle animazioni del tuo GLB.
//  Copia il nome dello sportello guidatore in driverDoorNodeName.
// =========================================================
export const CAR_CONFIG = {
  modelPath: "/models/car.glb",
  scale: 1,                 // ingrandisci/riduci se serve
  yOffset: 0,               // alza/abbassa per appoggiare le ruote a terra
  driverDoorNodeName: "Door_FL",   // <-- nome del nodo/mesh dello sportello guidatore
  doorHingeAxis: "y" as "x" | "y" | "z",
  doorOpenAngleDeg: 65,     // apertura massima porta (in gradi)
  hasDoorAnimationClip: false,     // true se il GLB ha già una clip di apertura
  doorAnimationClipName: "DoorOpen",
};
