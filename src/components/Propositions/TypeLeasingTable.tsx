import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Settings, Edit, Trash2, Plus, Search, Filter } from "lucide-react";
import { TypeLeasing, TypeLeasingForm } from "./TypeLeasingForm";

interface TypeLeasingTableProps {
  typesLeasing: TypeLeasing[];
  onEdit: (typeLeasing: TypeLeasing) => void;
  onDelete: (id: string) => void;
  onAdd: (typeLeasing: TypeLeasing) => void;
}

export function TypeLeasingTable({ typesLeasing, onEdit, onDelete, onAdd }: TypeLeasingTableProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<TypeLeasing | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "actif" | "inactif">("all");

  const filteredTypes = typesLeasing.filter(type => {
    const matchesSearch = type.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         type.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "actif" && type.actif) ||
                         (filterStatus === "inactif" && !type.actif);
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (typeLeasing: TypeLeasing) => {
    setSelectedType(typeLeasing);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedType(undefined);
    setShowForm(true);
  };

  const handleSubmit = (data: TypeLeasing) => {
    if (selectedType) {
      onEdit(data);
    } else {
      onAdd(data);
    }
    setShowForm(false);
    setSelectedType(undefined);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedType(undefined);
  };

  const getAchatBienLabel = (achatBien: string) => {
    switch (achatBien) {
      case "optionnel":
        return "Optionnel";
      case "obligatoire":
        return "Obligatoire";
      case "pas_option":
        return "Pas d'option";
      default:
        return achatBien;
    }
  };

  const getUsageLabel = (usage: string) => {
    switch (usage) {
      case "professionnel":
        return "Professionnel";
      case "personnel":
        return "Personnel";
      case "mixte":
        return "Mixte";
      default:
        return usage;
    }
  };

  if (showForm) {
    return (
      <TypeLeasingForm
        typeLeasing={selectedType}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec titre et actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Référentiel Types de Leasing</h1>
            <p className="text-muted-foreground">Gestion des types de contrats de leasing</p>
          </div>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Type
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un type de leasing..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                Tous ({typesLeasing.length})
              </Button>
              <Button
                variant={filterStatus === "actif" ? "default" : "outline"}
                onClick={() => setFilterStatus("actif")}
                size="sm"
              >
                Actifs ({typesLeasing.filter(t => t.actif).length})
              </Button>
              <Button
                variant={filterStatus === "inactif" ? "default" : "outline"}
                onClick={() => setFilterStatus("inactif")}
                size="sm"
              >
                Inactifs ({typesLeasing.filter(t => !t.actif).length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Cibles</TableHead>
                  <TableHead className="font-semibold">Matériel concerné</TableHead>
                  <TableHead className="font-semibold">Achat fin contrat</TableHead>
                  <TableHead className="font-semibold">Usage</TableHead>
                  <TableHead className="font-semibold">Statut</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTypes.map((typeLeasing) => (
                <TableRow key={typeLeasing.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {typeLeasing.nom}
                      {typeLeasing.parametrable && (
                        <Badge variant="outline" className="text-xs">
                          Paramétrable
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={typeLeasing.description}>
                      {typeLeasing.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {typeLeasing.cibles.slice(0, 2).map((cible) => (
                        <Badge key={cible} variant="secondary" className="text-xs">
                          {cible}
                        </Badge>
                      ))}
                      {typeLeasing.cibles.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{typeLeasing.cibles.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {typeLeasing.materielConcerne.slice(0, 2).map((materiel) => (
                        <Badge key={materiel} variant="secondary" className="text-xs">
                          {materiel}
                        </Badge>
                      ))}
                      {typeLeasing.materielConcerne.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{typeLeasing.materielConcerne.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={typeLeasing.achatBienFinContrat === "obligatoire" ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {getAchatBienLabel(typeLeasing.achatBienFinContrat)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {getUsageLabel(typeLeasing.usage)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={typeLeasing.actif ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {typeLeasing.actif ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(typeLeasing)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(typeLeasing.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
              </Table>
            </div>
            
            {filteredTypes.length === 0 && searchTerm && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Aucun résultat pour "{searchTerm}"</p>
              </div>
            )}
            
            {typesLeasing.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Aucun type de leasing configuré</p>
                <p className="text-sm mt-1">Cliquez sur "Nouveau Type" pour commencer</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }