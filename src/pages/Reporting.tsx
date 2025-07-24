import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Plus, Search, Edit, Trash2, FileText, Users, Download } from "lucide-react";
import { toast } from "sonner";

interface Rapport {
  id: string;
  nom: string;
  type: string;
  frequence: string;
  format: string;
  dateCreation: string;
  statut: string;
  kpiIds: string[];
}

interface KPI {
  id: string;
  nom: string;
  description: string;
  type: string;
  valeur: number;
  unite: string;
  tendance: 'up' | 'down' | 'stable';
}

interface Acteur {
  id: string;
  nom: string;
  type: 'expert' | 'assureur' | 'réparateur';
  contact: string;
  specialite: string;
  actif: boolean;
}

const mockRapports: Rapport[] = [
  {
    id: "1",
    nom: "Rapport Mensuel Sinistres",
    type: "Synthèse",
    frequence: "Mensuel",
    format: "PDF",
    dateCreation: "2024-01-15",
    statut: "Actif",
    kpiIds: ["1", "2"]
  }
];

const mockKPIs: KPI[] = [
  { 
    id: "1", 
    nom: "Taux de sinistralité", 
    description: "Pourcentage de sinistres par rapport aux contrats",
    type: "Pourcentage",
    valeur: 5.2,
    unite: "%",
    tendance: 'down'
  },
  { 
    id: "2", 
    nom: "Délai moyen de traitement", 
    description: "Temps moyen pour traiter un sinistre",
    type: "Durée",
    valeur: 15,
    unite: "jours",
    tendance: 'up'
  }
];

const mockActeurs: Acteur[] = [
  {
    id: "1",
    nom: "Expert Dufour",
    type: "expert",
    contact: "expert.dufour@email.com",
    specialite: "Automobile",
    actif: true
  },
  {
    id: "2",
    nom: "Assurance AXA",
    type: "assureur",
    contact: "contact@axa.fr",
    specialite: "Multirisque",
    actif: true
  }
];

export default function Reporting() {
  const [rapports, setRapports] = useState<Rapport[]>(mockRapports);
  const [kpis, setKPIs] = useState<KPI[]>(mockKPIs);
  const [acteurs, setActeurs] = useState<Acteur[]>(mockActeurs);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddRapport = (data: Partial<Rapport>) => {
    const newRapport: Rapport = {
      id: Date.now().toString(),
      nom: data.nom || "",
      type: data.type || "",
      frequence: data.frequence || "",
      format: data.format || "",
      dateCreation: new Date().toISOString().split('T')[0],
      statut: data.statut || "Actif",
      kpiIds: data.kpiIds || []
    };
    setRapports([...rapports, newRapport]);
    toast.success("Rapport créé avec succès");
    setIsDialogOpen(false);
  };

  const handleDeleteRapport = (id: string) => {
    setRapports(rapports.filter(r => r.id !== id));
    toast.success("Rapport supprimé");
  };

  const filteredRapports = rapports.filter(rapport =>
    rapport.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rapport.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 bg-gradient-to-br from-background to-muted/20">
            <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Reporting et Analytics</h1>
            <p className="text-muted-foreground">Rapports et indicateurs de performance</p>
          </div>
        </div>

        <Tabs defaultValue="rapports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rapports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rapports
            </TabsTrigger>
            <TabsTrigger value="kpis" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              KPIs
            </TabsTrigger>
            <TabsTrigger value="acteurs" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Acteurs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rapports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Modèles de Rapports</span>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nouveau Rapport
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Créer un Modèle de Rapport</DialogTitle>
                      </DialogHeader>
                      <RapportForm onSubmit={handleAddRapport} kpis={kpis} />
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Rechercher un rapport..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Fréquence</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRapports.map((rapport) => (
                      <TableRow key={rapport.id}>
                        <TableCell className="font-medium">{rapport.nom}</TableCell>
                        <TableCell>{rapport.type}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{rapport.frequence}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{rapport.format}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={rapport.statut === 'Actif' ? 'default' : 'secondary'}>
                            {rapport.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteRapport(rapport.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kpis">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpis.map((kpi) => (
                <Card key={kpi.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{kpi.nom}</h3>
                      <Badge variant={kpi.tendance === 'up' ? 'default' : kpi.tendance === 'down' ? 'destructive' : 'secondary'}>
                        {kpi.tendance === 'up' ? '↑' : kpi.tendance === 'down' ? '↓' : '→'}
                      </Badge>
                    </div>
                    <p className="text-3xl font-bold text-primary mb-2">{kpi.valeur} {kpi.unite}</p>
                    <p className="text-sm text-muted-foreground">{kpi.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="acteurs">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acteurs.map((acteur) => (
                <Card key={acteur.id} className={`border-l-4 ${
                  acteur.type === 'expert' ? 'border-l-green-500' : 
                  acteur.type === 'assureur' ? 'border-l-blue-500' : 
                  'border-l-orange-500'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{acteur.nom}</h3>
                      <Badge variant={acteur.actif ? 'default' : 'secondary'}>
                        {acteur.actif ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{acteur.contact}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={
                        acteur.type === 'expert' ? 'text-green-700' : 
                        acteur.type === 'assureur' ? 'text-blue-700' : 
                        'text-orange-700'
                      }>
                        {acteur.type}
                      </Badge>
                      <Badge variant="secondary">{acteur.specialite}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function RapportForm({ onSubmit, kpis }: { 
  onSubmit: (data: Partial<Rapport>) => void;
  kpis: KPI[];
}) {
  const [formData, setFormData] = useState<Partial<Rapport>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Nom du rapport</Label>
        <Input
          value={formData.nom || ''}
          onChange={(e) => setFormData({...formData, nom: e.target.value})}
          placeholder="Nom du rapport"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Type de rapport</Label>
          <Select onValueChange={(value) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Synthèse">Synthèse</SelectItem>
              <SelectItem value="Détaillé">Détaillé</SelectItem>
              <SelectItem value="Analytique">Analytique</SelectItem>
              <SelectItem value="Dashboard">Dashboard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Fréquence</Label>
          <Select onValueChange={(value) => setFormData({...formData, frequence: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une fréquence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Quotidien">Quotidien</SelectItem>
              <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
              <SelectItem value="Mensuel">Mensuel</SelectItem>
              <SelectItem value="Trimestriel">Trimestriel</SelectItem>
              <SelectItem value="Annuel">Annuel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Format de sortie</Label>
        <Select onValueChange={(value) => setFormData({...formData, format: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="Excel">Excel</SelectItem>
            <SelectItem value="CSV">CSV</SelectItem>
            <SelectItem value="HTML">HTML</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">Créer le Rapport</Button>
    </form>
  );
}