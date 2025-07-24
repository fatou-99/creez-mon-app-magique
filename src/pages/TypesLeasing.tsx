import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TypeLeasingTable } from "@/components/Propositions/TypeLeasingTable";
import { TypeLeasing } from "@/components/Propositions/TypeLeasingForm";
import { useToast } from "@/hooks/use-toast";

const TYPES_LEASING_DEMO: TypeLeasing[] = [
  {
    id: "1",
    nom: "Crédit-bail",
    description: "Financement des investissements de biens d'équipement, de matériels et d'outillage ou d'immeubles",
    cibles: ["Professionnel", "Particulier"],
    materielConcerne: ["Meubles", "Industries", "Immeubles"],
    achatBienFinContrat: "optionnel",
    usage: "professionnel",
    commentaires: "Ajouter le type location-vente",
    parametrable: true,
    actif: true
  },
  {
    id: "2",
    nom: "Location-vente",
    description: "Financement des investissements de biens d'équipement, de matériels et d'outillage ou d'immeubles",
    cibles: ["Professionnel", "Particulier"],
    materielConcerne: ["Meubles", "Industries", "Immeubles"],
    achatBienFinContrat: "obligatoire",
    usage: "professionnel",
    commentaires: "A mettre dans le crédit-bail pour CCA",
    parametrable: false,
    actif: true
  },
  {
    id: "3",
    nom: "LOA (Valeur Résiduelle)",
    description: "Financement de biens mobiliers, immobiliers",
    cibles: ["Professionnel", "Particulier"],
    materielConcerne: ["Meubles", "Industries", "Immeubles"],
    achatBienFinContrat: "obligatoire",
    usage: "personnel",
    commentaires: "",
    parametrable: false,
    actif: true
  },
  {
    id: "4",
    nom: "LLD",
    description: "Financement de biens mobiliers",
    cibles: ["Professionnel", "Particulier"],
    materielConcerne: ["Meubles", "Industries", "Immeubles"],
    achatBienFinContrat: "pas_option",
    usage: "professionnel",
    commentaires: "L'engagement de reprise est payé par le fournisseur au loueur",
    parametrable: false,
    actif: true
  }
];

export default function TypesLeasing() {
  const [typesLeasing, setTypesLeasing] = useState<TypeLeasing[]>(TYPES_LEASING_DEMO);
  const { toast } = useToast();

  const handleEdit = (updatedType: TypeLeasing) => {
    setTypesLeasing(prev => 
      prev.map(type => 
        type.id === updatedType.id ? updatedType : type
      )
    );
    toast({
      title: "Type de leasing modifié",
      description: `Le type "${updatedType.nom}" a été modifié avec succès.`,
    });
  };

  const handleDelete = (id: string) => {
    const typeToDelete = typesLeasing.find(type => type.id === id);
    setTypesLeasing(prev => prev.filter(type => type.id !== id));
    toast({
      title: "Type de leasing supprimé",
      description: `Le type "${typeToDelete?.nom}" a été supprimé.`,
      variant: "destructive",
    });
  };

  const handleAdd = (newType: TypeLeasing) => {
    setTypesLeasing(prev => [...prev, newType]);
    toast({
      title: "Type de leasing créé",
      description: `Le type "${newType.nom}" a été créé avec succès.`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-background flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold">Types de Leasing</h1>
                <p className="text-sm text-muted-foreground">Configuration des types de leasing disponibles</p>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <TypeLeasingTable
              typesLeasing={typesLeasing}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}