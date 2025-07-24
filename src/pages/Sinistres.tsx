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
import { AlertTriangle, Plus, Search, Edit, Trash2, FileText, Shield, Users } from "lucide-react";
import { toast } from "sonner";

interface Sinistre {
  id: string;
  numero: string;
  dateDeclaration: string;
  natureSinistre: string;
  typeSinistre: string;
  montantDommage: number;
  statut: string;
  description: string;
  contratId: string;
  expertId?: string;
}

interface NatureSinistre {
  id: string;
  nom: string;
  description: string;
  code: string;
  actif: boolean;
}

interface TypeSinistre {
  id: string;
  nom: string;
  description: string;
  partiel: boolean;
  total: boolean;
}

const mockSinistres: Sinistre[] = [
  {
    id: "1",
    numero: "SIN2024001",
    dateDeclaration: "2024-01-15",
    natureSinistre: "Incendie",
    typeSinistre: "Total",
    montantDommage: 15750000,
    statut: "En cours",
    description: "Incendie partiel des locaux",
    contratId: "CTR001"
  }
];

const mockNatures: NatureSinistre[] = [
  { id: "1", nom: "Incendie", description: "Dommages causés par le feu", code: "INC", actif: true },
  { id: "2", nom: "Vol", description: "Vol de matériel", code: "VOL", actif: true },
  { id: "3", nom: "Dégât des eaux", description: "Dommages causés par l'eau", code: "DEG", actif: true }
];

const mockTypes: TypeSinistre[] = [
  { id: "1", nom: "Partiel", description: "Sinistre partiel", partiel: true, total: false },
  { id: "2", nom: "Total", description: "Sinistre total", partiel: false, total: true }
];

export default function Sinistres() {
  const [sinistres, setSinistres] = useState<Sinistre[]>(mockSinistres);
  const [natures, setNatures] = useState<NatureSinistre[]>(mockNatures);
  const [types, setTypes] = useState<TypeSinistre[]>(mockTypes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSinistre, setSelectedSinistre] = useState<Sinistre | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddSinistre = (data: Partial<Sinistre>) => {
    const newSinistre: Sinistre = {
      id: Date.now().toString(),
      numero: `SIN${new Date().getFullYear()}${String(sinistres.length + 1).padStart(3, '0')}`,
      dateDeclaration: data.dateDeclaration || new Date().toISOString().split('T')[0],
      natureSinistre: data.natureSinistre || "",
      typeSinistre: data.typeSinistre || "",
      montantDommage: data.montantDommage || 0,
      statut: data.statut || "Déclaré",
      description: data.description || "",
      contratId: data.contratId || "",
      expertId: data.expertId
    };
    setSinistres([...sinistres, newSinistre]);
    toast.success("Sinistre ajouté avec succès");
    setIsDialogOpen(false);
  };

  const handleDeleteSinistre = (id: string) => {
    setSinistres(sinistres.filter(s => s.id !== id));
    toast.success("Sinistre supprimé");
  };

  const filteredSinistres = sinistres.filter(sinistre =>
    sinistre.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sinistre.natureSinistre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sinistre.statut.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="p-3 rounded-xl bg-red-500/10">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gestion des Sinistres</h1>
            <p className="text-muted-foreground">Suivi et gestion des déclarations de sinistres</p>
          </div>
        </div>

        <Tabs defaultValue="sinistres" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sinistres" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Sinistres
            </TabsTrigger>
            <TabsTrigger value="natures" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Nature Sinistres
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Types Sinistres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sinistres" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Liste des Sinistres</span>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nouveau Sinistre
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Déclarer un Sinistre</DialogTitle>
                      </DialogHeader>
                      <SinistreForm onSubmit={handleAddSinistre} natures={natures} types={types} />
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Rechercher par numéro, nature ou statut..."
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
                      <TableHead>Date</TableHead>
                      <TableHead>Nature</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSinistres.map((sinistre) => (
                      <TableRow key={sinistre.id}>
                        <TableCell className="font-medium">{sinistre.numero}</TableCell>
                        <TableCell>{new Date(sinistre.dateDeclaration).toLocaleDateString()}</TableCell>
                        <TableCell>{sinistre.natureSinistre}</TableCell>
                        <TableCell>
                          <Badge variant={sinistre.typeSinistre === 'Total' ? 'destructive' : 'secondary'}>
                            {sinistre.typeSinistre}
                          </Badge>
                        </TableCell>
                        <TableCell>{sinistre.montantDommage.toLocaleString()} XAF</TableCell>
                        <TableCell>
                          <Badge variant={sinistre.statut === 'Clôturé' ? 'secondary' : 'default'}>
                            {sinistre.statut}
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
                              onClick={() => handleDeleteSinistre(sinistre.id)}
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

          <TabsContent value="natures">
            <Card>
              <CardHeader>
                <CardTitle>Nature des Sinistres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {natures.map((nature) => (
                    <Card key={nature.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{nature.nom}</h3>
                          <Badge variant="outline">{nature.code}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{nature.description}</p>
                        <div className="mt-2">
                          <Badge variant={nature.actif ? 'default' : 'secondary'}>
                            {nature.actif ? 'Actif' : 'Inactif'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="types">
            <Card>
              <CardHeader>
                <CardTitle>Types de Sinistres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {types.map((type) => (
                    <Card key={type.id} className="border-l-4 border-l-orange-500">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{type.nom}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                        <div className="flex gap-2">
                          {type.partiel && <Badge variant="outline">Partiel</Badge>}
                          {type.total && <Badge variant="destructive">Total</Badge>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function SinistreForm({ onSubmit, natures, types }: { 
  onSubmit: (data: Partial<Sinistre>) => void;
  natures: NatureSinistre[];
  types: TypeSinistre[];
}) {
  const [formData, setFormData] = useState<Partial<Sinistre>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date de déclaration</Label>
          <Input
            type="date"
            value={formData.dateDeclaration || ''}
            onChange={(e) => setFormData({...formData, dateDeclaration: e.target.value})}
          />
        </div>
        <div>
          <Label>Contrat ID</Label>
          <Input
            value={formData.contratId || ''}
            onChange={(e) => setFormData({...formData, contratId: e.target.value})}
            placeholder="ID du contrat"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Nature du sinistre</Label>
          <Select onValueChange={(value) => setFormData({...formData, natureSinistre: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une nature" />
            </SelectTrigger>
            <SelectContent>
              {natures.map((nature) => (
                <SelectItem key={nature.id} value={nature.nom}>{nature.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Type de sinistre</Label>
          <Select onValueChange={(value) => setFormData({...formData, typeSinistre: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type.id} value={type.nom}>{type.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Montant des dommages (XAF)</Label>
          <Input
            type="number"
            value={formData.montantDommage || ''}
            onChange={(e) => setFormData({...formData, montantDommage: parseFloat(e.target.value)})}
            placeholder="0"
          />
        </div>
        <div>
          <Label>Statut</Label>
          <Select onValueChange={(value) => setFormData({...formData, statut: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Déclaré">Déclaré</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Expert désigné">Expert désigné</SelectItem>
              <SelectItem value="Indemnisé">Indemnisé</SelectItem>
              <SelectItem value="Clôturé">Clôturé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Input
          value={formData.description || ''}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Description du sinistre"
        />
      </div>

      <Button type="submit" className="w-full">Déclarer le Sinistre</Button>
    </form>
  );
}