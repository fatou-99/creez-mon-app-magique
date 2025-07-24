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
import { CreditCard, Plus, Search, Edit, Trash2, Calendar, Receipt, Wallet } from "lucide-react";
import { toast } from "sonner";

interface Facture {
  id: string;
  numero: string;
  dateEmission: string;
  dateEcheance: string;
  montant: number;
  statut: string;
  typeFacturation: string;
  moyenPaiement?: string;
  contratId: string;
}

interface TypeFrais {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  taux?: number;
}

interface MoyenPaiement {
  id: string;
  nom: string;
  description: string;
  actif: boolean;
  delaiTraitement: number;
}

const mockFactures: Facture[] = [
  {
    id: "1",
    numero: "FAC2024001",
    dateEmission: "2024-01-15",
    dateEcheance: "2024-02-15",
    montant: 2450000,
    statut: "Payée",
    typeFacturation: "Mensuel",
    moyenPaiement: "Virement",
    contratId: "CTR001"
  },
  {
    id: "2",
    numero: "FAC2024002",
    dateEmission: "2024-01-20",
    dateEcheance: "2024-02-20",
    montant: 1850000,
    statut: "En attente",
    typeFacturation: "Mensuel",
    moyenPaiement: "Prélèvement",
    contratId: "CTR002"
  },
  {
    id: "3",
    numero: "FAC2024003",
    dateEmission: "2024-01-25",
    dateEcheance: "2024-02-25",
    montant: 3200000,
    statut: "Impayée",
    typeFacturation: "Trimestriel",
    moyenPaiement: "Virement",
    contratId: "CTR003"
  }
];

const mockTypesFrais: TypeFrais[] = [
  { id: "1", nom: "Loyer", description: "Loyer mensuel", categorie: "Principal", taux: 0 },
  { id: "2", nom: "Assurance", description: "Prime d'assurance", categorie: "Accessoire", taux: 2.5 },
  { id: "3", nom: "Pénalité", description: "Pénalité de retard", categorie: "Pénalité", taux: 8 }
];

const mockMoyensPaiement: MoyenPaiement[] = [
  { id: "1", nom: "Virement", description: "Virement bancaire", actif: true, delaiTraitement: 1 },
  { id: "2", nom: "Prélèvement", description: "Prélèvement automatique", actif: true, delaiTraitement: 0 },
  { id: "3", nom: "Chèque", description: "Chèque bancaire", actif: false, delaiTraitement: 3 }
];

export default function Depenses() {
  const [factures, setFactures] = useState<Facture[]>(mockFactures);
  const [typesFrais, setTypesFrais] = useState<TypeFrais[]>(mockTypesFrais);
  const [moyensPaiement, setMoyensPaiement] = useState<MoyenPaiement[]>(mockMoyensPaiement);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddFacture = (data: Partial<Facture>) => {
    const newFacture: Facture = {
      id: Date.now().toString(),
      numero: `FAC${new Date().getFullYear()}${String(factures.length + 1).padStart(3, '0')}`,
      dateEmission: data.dateEmission || new Date().toISOString().split('T')[0],
      dateEcheance: data.dateEcheance || "",
      montant: data.montant || 0,
      statut: data.statut || "En attente",
      typeFacturation: data.typeFacturation || "",
      moyenPaiement: data.moyenPaiement,
      contratId: data.contratId || ""
    };
    setFactures([...factures, newFacture]);
    toast.success("Facture créée avec succès");
    setIsDialogOpen(false);
  };

  const handleDeleteFacture = (id: string) => {
    setFactures(factures.filter(f => f.id !== id));
    toast.success("Facture supprimée");
  };

  const filteredFactures = factures.filter(facture =>
    facture.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facture.statut.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facture.contratId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFactures = factures.reduce((sum, f) => sum + f.montant, 0);
  const facturesPayees = factures.filter(f => f.statut === 'Payée').length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 bg-gradient-to-br from-background to-muted/20">
            <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-green-500/10">
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gestion des Dépenses</h1>
            <p className="text-muted-foreground">Facturation et moyens de paiement</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Factures</p>
                  <p className="text-2xl font-bold">{totalFactures.toLocaleString()} XAF</p>
                </div>
                <Receipt className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Factures Payées</p>
                  <p className="text-2xl font-bold">{facturesPayees}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En Attente</p>
                  <p className="text-2xl font-bold">{factures.length - facturesPayees}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="factures" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="factures" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Factures
            </TabsTrigger>
            <TabsTrigger value="frais" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Types de Frais
            </TabsTrigger>
            <TabsTrigger value="paiements" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Moyens de Paiement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="factures" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Liste des Factures</span>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nouvelle Facture
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Créer une Facture</DialogTitle>
                      </DialogHeader>
                      <FactureForm 
                        onSubmit={handleAddFacture} 
                        typesFrais={typesFrais} 
                        moyensPaiement={moyensPaiement} 
                      />
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Rechercher une facture..."
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
                      <TableHead>Date Émission</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFactures.map((facture) => (
                      <TableRow key={facture.id}>
                        <TableCell className="font-medium">{facture.numero}</TableCell>
                        <TableCell>{new Date(facture.dateEmission).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(facture.dateEcheance).toLocaleDateString()}</TableCell>
                        <TableCell>{facture.montant.toLocaleString()} XAF</TableCell>
                        <TableCell>
                          <Badge variant="outline">{facture.typeFacturation}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={facture.statut === 'Payée' ? 'default' : 'secondary'}>
                            {facture.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteFacture(facture.id)}
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

          <TabsContent value="frais">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {typesFrais.map((type) => (
                <Card key={type.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{type.nom}</h3>
                      <Badge variant="outline">{type.categorie}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                    {type.taux && type.taux > 0 && (
                      <Badge variant="secondary">{type.taux}% taux</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paiements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moyensPaiement.map((moyen) => (
                <Card key={moyen.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{moyen.nom}</h3>
                      <Badge variant={moyen.actif ? 'default' : 'secondary'}>
                        {moyen.actif ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{moyen.description}</p>
                    <Badge variant="outline">
                      Délai: {moyen.delaiTraitement} jour{moyen.delaiTraitement > 1 ? 's' : ''}
                    </Badge>
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

function FactureForm({ onSubmit, typesFrais, moyensPaiement }: { 
  onSubmit: (data: Partial<Facture>) => void;
  typesFrais: TypeFrais[];
  moyensPaiement: MoyenPaiement[];
}) {
  const [formData, setFormData] = useState<Partial<Facture>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date d'émission</Label>
          <Input
            type="date"
            value={formData.dateEmission || ''}
            onChange={(e) => setFormData({...formData, dateEmission: e.target.value})}
          />
        </div>
        <div>
          <Label>Date d'échéance</Label>
          <Input
            type="date"
            value={formData.dateEcheance || ''}
            onChange={(e) => setFormData({...formData, dateEcheance: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Montant (XAF)</Label>
          <Input
            type="number"
            value={formData.montant || ''}
            onChange={(e) => setFormData({...formData, montant: parseFloat(e.target.value)})}
            placeholder="0"
            required
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
          <Label>Type de facturation</Label>
          <Select onValueChange={(value) => setFormData({...formData, typeFacturation: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Type de facturation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mensuel">Mensuel</SelectItem>
              <SelectItem value="Trimestriel">Trimestriel</SelectItem>
              <SelectItem value="Semestriel">Semestriel</SelectItem>
              <SelectItem value="Annuel">Annuel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Moyen de paiement</Label>
          <Select onValueChange={(value) => setFormData({...formData, moyenPaiement: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Moyen de paiement" />
            </SelectTrigger>
            <SelectContent>
              {moyensPaiement.filter(m => m.actif).map((moyen) => (
                <SelectItem key={moyen.id} value={moyen.nom}>{moyen.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">Créer la Facture</Button>
    </form>
  );
}