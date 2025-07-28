import { z } from 'zod';

// Schémas Zod pour la validation des formulaires
export const MaterialDataSchema = z.object({
  id: z.string(),
  referenceMateriel: z.string(),
  designation: z.string().min(1, "La désignation est requise"),
  famille: z.string().min(1, "La famille est requise"),
  marque: z.string().min(1, "La marque est requise"),
  modele: z.string().min(1, "Le modèle est requis"),
  numeroSerieChassis: z.string(),
  anneeFabrication: z.number().min(1900).max(new Date().getFullYear()),
  dateMiseEnService: z.string(),
  dureeUtilisationEstimee: z.string(),
  origineMateriel: z.enum(["Local", "Importé"]),
  statut: z.enum(["En stock", "Loué", "Restitué", "Repris", "Vendu"]),
  etatMateriel: z.enum(["Neuf", "Occasion"]),
  usage: z.enum(["Professionnel", "Privé"]),
  dateAcquisition: z.string(),
  valeurInitialeHT: z.number().min(0),
  valeurInitialeTTC: z.number().min(0),
  valeurMarche: z.number().min(0),
  observations: z.string().optional(),
  fournisseur: z.string().min(1, "Le fournisseur est requis"),
});

export const ComponentDataSchema = z.object({
  id: z.string(),
  numeroComposant: z.string(),
  designation: z.string().min(1, "La désignation est requise"),
  familleComposant: z.string().min(1, "La famille est requise"),
  marque: z.string().min(1, "La marque est requise"),
  modele: z.string().min(1, "Le modèle est requis"),
  numeroSerieChassis: z.string().optional(),
  referenceMaterielAssocie: z.string().optional(),
  anneeFabrication: z.number().min(1900).max(new Date().getFullYear()),
  dateMiseEnService: z.string(),
  dureeUtilisationEstimee: z.string(),
  dureeUtilisationType: z.enum(["heures", "kilometrage"]),
  fournisseur: z.string().min(1, "Le fournisseur est requis"),
  puissance: z.string().optional(),
  dateAcquisition: z.string(),
  valeurInitialeHT: z.number().min(0),
  valeurInitialeTTC: z.number().min(0),
  caracteristique1: z.string().optional(),
  caracteristique2: z.string().optional(),
  caracteristique3: z.string().optional(),
  observations: z.string().optional(),
  materielParentId: z.string(),
});

export const TiersSchema = z.object({
  id: z.string(),
  type: z.enum(["client", "prospect"]),
  nom: z.string().min(1, "Le nom est requis"),
  prenom: z.string().optional(),
  raisonSociale: z.string().optional(),
  adresse: z.string().min(1, "L'adresse est requise"),
  telephone: z.string().min(1, "Le téléphone est requis"),
  email: z.string().email("Email invalide"),
  codeClient: z.string().optional(),
  segment: z.string().optional(),
  secteur: z.string().optional(),
  profession: z.string().optional(),
  groupeClient: z.string().optional(),
});

export const PropositionSchema = z.object({
  id: z.string(),
  numero: z.string(),
  type: z.enum(["standard", "convention", "campagne"]),
  duree: z.number().min(1, "La durée doit être supérieure à 0"),
  apport: z.number().min(0, "L'apport ne peut pas être négatif"),
  frequencePaiement: z.enum(["mensuel", "trimestriel", "annuel"]),
  montantFinance: z.number().min(0),
  loyer: z.number().min(0),
  statut: z.enum(["brouillon", "validee", "acceptee", "refusee", "annulee"]),
  dateCreation: z.date(),
  dateModification: z.date().optional(),
  dateValidation: z.date().optional(),
  validePar: z.string().optional(),
});

export type MaterialDataInput = z.infer<typeof MaterialDataSchema>;
export type ComponentDataInput = z.infer<typeof ComponentDataSchema>;
export type TiersInput = z.infer<typeof TiersSchema>;
export type PropositionInput = z.infer<typeof PropositionSchema>;