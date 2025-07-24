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
import { DollarSign, Plus, Search, Edit, Trash2, Users, AlertTriangle, Calendar } from "lucide-react";
import { toast } from "sonner";

interface DossierRecouvrement {
  id: string;
  numero: string;
  dateOuverture: string;
  contratId: string;
  montantImpaye: number;
  statut: string;
  motifImpaye: string;
  tiersIntervenant?: string;
  dateRelance?: string;
}

interface Relance {
  id: string;
  type: string;
  frequence: string;
  delai: number;
  frais?: number;
  automatique: boolean;
}

interface TiersIntervenant {
  id: string;
  nom: string;
  type: 'cabinet' | 'huissier' | 'avocat';
  contact: string;
  commission: number;
  actif: boolean;
}

const mockDossiers: DossierRecouvrement[] = [
  {
    id: "1",
    numero: "REC2024001",
    dateOuverture: "2024-01-15",
    contratId: "CTR001",
    montantImpaye: 8750000,
    statut: "En cours",
    motifImpaye: "Difficultés financières",
    tiersIntervenant: "Cabinet Recouvrement ABC",
    dateRelance: "2024-01-10"
  }
];

const mockRelances: Relance[] = [
  { id: "1", type: "Lettre simple", frequence: "15 jours", delai: 15, automatique: true },
  { id: "2", type: "Lettre recommandée", frequence: "30 jours", delai: 30, frais: 35000, automatique: false },
  { id: "3", type: "Mise en demeure", frequence: "45 jours", delai: 45, frais: 75000, automatique: false }
];

const mockTiers: TiersIntervenant[] = [
  {
    id: "1",
    nom: "Cabinet Recouvrement ABC",
    type: "cabinet",
    contact: "contact@abc-recouvrement.fr",
    commission: 15,
    actif: true
  },
  {
    id: "2",
    nom: "Huissier Martin",
    type: "huissier",
    contact: "martin.huissier@justice.fr",
    commission: 20,
    actif: true
  }
];

const motifsImpayes = [
  "Difficultés financières",
  "Litige commercial",
  "Défaillance client",
  "Problème administratif",
  "Autre"
];

export default function Recouvrement() {
  const [dossiers, setDossiers] = useState<DossierRecouvrement[]>(mockDossiers);
  const [relances, setRelances] = useState<Relance[]>(mockRelances);
  const [tiers, setTiers] = useState<TiersIntervenant[]>(mockTiers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddDossier = (data: Partial<DossierRecouvrement>) => {
    const newDossier: DossierRecouvrement = {
      id: Date.now().toString(),
      numero: `REC${new Date().getFullYear()}${String(dossiers.length + 1).padStart(3, '0')}`,
      dateOuverture: data.dateOuverture || new Date().toISOString().split('T')[0],
      contratId: data.contratId || "",
      montantImpaye: data.montantImpaye || 0,
      statut: data.statut || "Ouvert",
      motifImpaye: data.motifImpaye || "",
      tiersIntervenant: data.tiersIntervenant,
      dateRelance: data.dateRelance
    };
    setDossiers([...dossiers, newDossier]);
    toast.success("Dossier de recouvrement créé");
    setIsDialogOpen(false);
  };

  const handleDeleteDossier = (id: string) => {
    setDossiers(dossiers.filter(d => d.id !== id));
    toast.success("Dossier supprimé");
  };

  const filteredDossiers = dossiers.filter(dossier =>
    dossier.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dossier.contratId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dossier.statut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalImpayes = dossiers.reduce((sum, d) => sum + d.montantImpaye, 0);
  const dossiersEnCours = dossiers.filter(d => d.statut === 'En cours').length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 bg-gradient-to-br from-background to-muted/20">
            <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-red-500/10">
            <DollarSign className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gestion du Recouvrement</h1>
            <p className="text-muted-foreground">Suivi des impayés et actions de recouvrement</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Impayés</p>
                  <p className="text-2xl font-bold text-red-600">{totalImpayes.toLocaleString()} XAF</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dossiers en Cours</p>
                  <p className="text-2xl font-bold">{dossiersEnCours}</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tiers Actifs</p>
                  <p className="text-2xl font-bold">{tiers.filter(t => t.actif).length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dossiers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dossiers" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Dossiers
            </TabsTrigger>
            <TabsTrigger value="relances" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Relances
            </TabsTrigger>
            <TabsTrigger value="tiers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Tiers Intervenants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dossiers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Dossiers de Recouvrement</span>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nouveau Dossier
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Ouvrir un Dossier de Recouvrement</DialogTitle>
                      </DialogHeader>
                      <DossierForm onSubmit={handleAddDossier} tiers={tiers} />
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Rechercher un dossier..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numéro</TableHead>
                      <TableHead>Date Ouverture</TableHead>
                      <TableHead>Contrat</TableHead>
                      <TableHead>Montant Impayé</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Motif</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDossiers.map((dossier) => (
                      <TableRow key={dossier.id}>
                        <TableCell className="font-medium">{dossier.numero}</TableCell>
                        <TableCell>{new Date(dossier.dateOuverture).toLocaleDateString()}</TableCell>
                        <TableCell>{dossier.contratId}</TableCell>
                        <TableCell className="text-red-600 font-medium">
                          {dossier.montantImpaye.toLocaleString()} XAF
                        </TableCell>
                        <TableCell>
                          <Badge variant={dossier.statut === 'Clôturé' ? 'secondary' : 'destructive'}>
                            {dossier.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{dossier.motifImpaye}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteDossier(dossier.id)}
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

          <TabsContent value="relances">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relances.map((relance) => (
                <Card key={relance.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{relance.type}</h3>
                      <Badge variant={relance.automatique ? 'default' : 'secondary'}>
                        {relance.automatique ? 'Auto' : 'Manuel'}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Fréquence: {relance.frequence}</p>
                      <p>Délai: {relance.delai} jours</p>
                      {relance.frais && <p>Frais: {relance.frais.toLocaleString()} XAF</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tiers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tiers.map((tier) => (
                <Card key={tier.id} className={`border-l-4 ${
                  tier.type === 'cabinet' ? 'border-l-blue-500' : 
                  tier.type === 'huissier' ? 'border-l-red-500' : 
                  'border-l-green-500'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{tier.nom}</h3>
                      <Badge variant={tier.actif ? 'default' : 'secondary'}>
                        {tier.actif ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>{tier.contact}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={
                          tier.type === 'cabinet' ? 'text-blue-700' : 
                          tier.type === 'huissier' ? 'text-red-700' : 
                          'text-green-700'
                        }>
                          {tier.type}
                        </Badge>
                        <Badge variant="secondary">{tier.commission}% commission</Badge>
                      </div>
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

function DossierForm({ onSubmit, tiers }: { 
  onSubmit: (data: Partial<DossierRecouvrement>) => void;
  tiers: TiersIntervenant[];
}) {
  const [formData, setFormData] = useState<Partial<DossierRecouvrement>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date d'ouverture</Label>
          <Input
            type="date"
            value={formData.dateOuverture || ''}
            onChange={(e) => setFormData({...formData, dateOuverture: e.target.value})}
          />
        </div>
        <div>
          <Label>Contrat ID</Label>
          <Input
            value={formData.contratId || ''}
            onChange={(e) => setFormData({...formData, contratId: e.target.value})}
            placeholder="ID du contrat"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Montant impayé (XAF)</Label>
          <Input
            type="number"
            value={formData.montantImpaye || ''}
            onChange={(e) => setFormData({...formData, montantImpaye: parseFloat(e.target.value)})}
            placeholder="0"
            required
          />
        </div>
        <div>
          <Label>Motif d'impayé</Label>
          <Select onValueChange={(value) => setFormData({...formData, motifImpaye: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un motif" />
            </SelectTrigger>
            <SelectContent>
              {motifsImpayes.map((motif) => (
                <SelectItem key={motif} value={motif}>{motif}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Tiers intervenant (optionnel)</Label>
        <Select onValueChange={(value) => setFormData({...formData, tiersIntervenant: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un tiers" />
          </SelectTrigger>
          <SelectContent>
            {tiers.filter(t => t.actif).map((tier) => (
              <SelectItem key={tier.id} value={tier.nom}>{tier.nom}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">Ouvrir le Dossier</Button>
    </form>
  );
}