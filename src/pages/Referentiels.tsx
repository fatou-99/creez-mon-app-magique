import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  Percent, 
  FileText, 
  Building, 
  BarChart3, 
  CreditCard, 
  DollarSign,
  Settings,
  Database,
  ChevronRight
} from "lucide-react";

interface ReferentielModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  items: string[];
  route: string;
  status: "active" | "coming_soon";
  itemCount: number;
}

const referentielModules: ReferentielModule[] = [
  {
    id: "tiers",
    title: "Module Tiers", 
    description: "Gestion des clients, prospects, fournisseurs et partenaires",
    icon: Users,
    items: [
      "Référentiel Client",
      "Référentiel Prospect", 
      "Référentiel Fournisseur",
      "Référentiel Tracking",
      "Référentiel Prestataires de maintenance",
      "Référentiel Assureur"
    ],
    route: "/tiers",
    status: "active",
    itemCount: 6
  },
  {
    id: "materiel",
    title: "Module Matériel",
    description: "Catalogues et gestion du matériel finançable",
    icon: Package,
    items: [
      "Référentiel Matériel",
      "Référentiel Composant",
      "Référentiel Maintenance",
      "Référentiel Catégorie de matériel",
      "Référentiel Type de matériel",
      "Référentiel Usage",
      "Référentiel Localisation"
    ],
    route: "/materiel",
    status: "active",
    itemCount: 7
  },
  {
    id: "bareme",
    title: "Module Barème",
    description: "Grilles tarifaires et conditions commerciales",
    icon: Percent,
    items: [
      "Référentiel Barème",
      "Référentiel Type de barème", 
      "Référentiel Niveau de barème",
      "Référentiel Critère de sélection (TEG, coût total, TRI_VAN)",
      "Référentiel Conditions commerciales"
    ],
    route: "/bareme",
    status: "active",
    itemCount: 5
  },
  {
    id: "proposition",
    title: "Module Proposition",
    description: "Types de propositions et canaux de distribution",
    icon: FileText,
    items: [
      "Référentiel Proposition",
      "Référentiel Type de proposition",
      "Référentiel Statut de proposition", 
      "Référentiel Canaux de vente (agence, en ligne, etc.)"
    ],
    route: "/propositions",
    status: "active",
    itemCount: 4
  },
  {
    id: "contrat",
    title: "Module Contrat",
    description: "Gestion des contrats et garanties",
    icon: Building,
    items: [
      "Référentiel Contrat",
      "Référentiel Type de contrat",
      "Référentiel Dépôt de garantie",
      "Référentiel Valeur résiduelle",
      "Référentiel Conditions de rachat",
      "Référentiel des premiers loyers majorés (PLM)"
    ],
    route: "/contrats",
    status: "active",
    itemCount: 6
  },
  {
    id: "sinistre",
    title: "Module Sinistre",
    description: "Gestion des sinistres et réclamations",
    icon: BarChart3,
    items: [
      "Référentiel Sinistre",
      "Référentiel Nature du sinistre",
      "Référentiel Type de sinistre (partiel, total)"
    ],
    route: "/sinistres",
    status: "active",
    itemCount: 3
  },
  {
    id: "reporting",
    title: "Module Reporting",
    description: "Rapports et indicateurs de performance",
    icon: BarChart3,
    items: [
      "Référentiel Statut sinistre",
      "Référentiel Acteurs (expert, assureur, réparateur)",
      "Référentiel Détail indemnisation",
      "Référentiel Modèle de rapport",
      "Référentiel Indicateur clé (KPI)",
      "Référentiel Fréquence de reporting",
      "Référentiel Format de sortie (PDF, Excel, etc.)",
      "Référentiel Droit d'accès aux rapports"
    ],
    route: "/reporting",
    status: "active",
    itemCount: 8
  },
  {
    id: "depenses", 
    title: "Module Dépenses",
    description: "Facturation et modes de paiement",
    icon: CreditCard,
    items: [
      "Référentiel Facture",
      "Référentiel Mode de facturation (mensuel, trimestriel, etc.)",
      "Référentiel Calendrier de facturation",
      "Référentiel Type de frais (loyers, pénalités, assurances)",
      "Référentiel Statut de facture",
      "Référentiel Moyen de paiement"
    ],
    route: "/depenses",
    status: "active",
    itemCount: 6
  },
  {
    id: "recouvrement",
    title: "Module Recouvrement", 
    description: "Gestion du recouvrement et impayés",
    icon: DollarSign,
    items: [
      "Référentiel Dossier de recouvrement",
      "Référentiel Statut de recouvrement (affiner tous les types)",
      "Référentiel Échéancier de paiement",
      "Référentiel Relance (type, fréquence)",
      "Référentiel Tiers intervenants (cabinet recouvrement, huissier etc)",
      "Référentiel Motifs d'impayés"
    ],
    route: "/recouvrement",
    status: "active", 
    itemCount: 6
  },
  {
    id: "users",
    title: "Gestion des utilisateurs",
    description: "Profils et droits d'accès",
    icon: Settings,
    items: [
      "Référentiel utilisateurs",
      "Référentiel profil",
      "Référentiel habilitation", 
      "Référentiel droits",
      "Référentiel niveaux de forçage",
      "Référentiel menu"
    ],
    route: "/compte",
    status: "active",
    itemCount: 6
  }
];

export default function Referentiels() {
  const activeModules = referentielModules.filter(m => m.status === "active");
  const comingSoonModules = referentielModules.filter(m => m.status === "coming_soon");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Référentiels Données</h1>
              <p className="text-muted-foreground text-lg">
                Configuration et gestion des référentiels métier
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Modules actifs</p>
                    <p className="text-2xl font-bold text-primary">{activeModules.length}</p>
                  </div>
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">À venir</p>
                    <p className="text-2xl font-bold text-orange-600">{comingSoonModules.length}</p>
                  </div>
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Settings className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total référentiels</p>
                    <p className="text-2xl font-bold text-green-600">
                      {referentielModules.reduce((sum, m) => sum + m.itemCount, 0)}
                    </p>
                  </div>
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modules actifs */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            Modules actifs
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeModules.map((module) => (
              <Card key={module.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/30 hover:border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <module.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {module.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                      {module.itemCount} items
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    {module.items.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                    {module.items.length > 4 && (
                      <div className="text-sm text-muted-foreground italic">
                        +{module.items.length - 4} autres référentiels...
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    asChild 
                    className="w-full group-hover:shadow-md transition-all"
                  >
                    <a href={module.route} className="flex items-center justify-center gap-2">
                      Gérer les référentiels
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modules à venir */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
            Prochainement disponibles
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {comingSoonModules.map((module) => (
              <Card key={module.id} className="opacity-75 border-dashed border-2 hover:opacity-90 transition-opacity">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <module.icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-muted-foreground">
                          {module.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-orange-500/50 text-orange-600">
                      Bientôt
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    {module.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                    {module.items.length > 3 && (
                      <div className="text-sm text-muted-foreground italic">
                        +{module.items.length - 3} autres référentiels...
                      </div>
                    )}
                  </div>
                  
                  <Button variant="outline" disabled className="w-full">
                    En développement
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}