import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Settings, Target, Package, CreditCard, User, MessageSquare } from "lucide-react";

export interface TypeLeasing {
  id: string;
  nom: string;
  description: string;
  cibles: string[];
  materielConcerne: string[];
  achatBienFinContrat: "optionnel" | "obligatoire" | "pas_option";
  usage: "professionnel" | "personnel" | "mixte";
  commentaires: string;
  parametrable: boolean;
  actif: boolean;
}

interface TypeLeasingFormProps {
  typeLeasing?: TypeLeasing;
  onSubmit: (data: TypeLeasing) => void;
  onCancel: () => void;
}

const CIBLES_OPTIONS = [
  "Entreprises",
  "Professions libérales",
  "Particuliers",
  "Associations",
  "Collectivités"
];

const MATERIEL_OPTIONS = [
  "Véhicules",
  "Matériel informatique",
  "Équipements industriels",
  "Mobilier de bureau",
  "Matériel médical",
  "Équipements agricoles",
  "Immobilier professionnel"
];

export function TypeLeasingForm({ typeLeasing, onSubmit, onCancel }: TypeLeasingFormProps) {
  const [formData, setFormData] = useState({
    nom: typeLeasing?.nom || "",
    description: typeLeasing?.description || "",
    cibles: typeLeasing?.cibles || [],
    materielConcerne: typeLeasing?.materielConcerne || [],
    achatBienFinContrat: typeLeasing?.achatBienFinContrat || "optionnel" as const,
    usage: typeLeasing?.usage || "professionnel" as const,
    commentaires: typeLeasing?.commentaires || "",
    parametrable: typeLeasing?.parametrable || false,
    actif: typeLeasing?.actif !== undefined ? typeLeasing.actif : true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.description) {
      return;
    }

    const newTypeLeasing: TypeLeasing = {
      id: typeLeasing?.id || Math.random().toString(36).substr(2, 9),
      nom: formData.nom,
      description: formData.description,
      cibles: formData.cibles,
      materielConcerne: formData.materielConcerne,
      achatBienFinContrat: formData.achatBienFinContrat,
      usage: formData.usage,
      commentaires: formData.commentaires,
      parametrable: formData.parametrable,
      actif: formData.actif
    };

    onSubmit(newTypeLeasing);
  };

  const handleCibleToggle = (cible: string) => {
    setFormData(prev => ({
      ...prev,
      cibles: prev.cibles.includes(cible)
        ? prev.cibles.filter(c => c !== cible)
        : [...prev.cibles, cible]
    }));
  };

  const handleMaterielToggle = (materiel: string) => {
    setFormData(prev => ({
      ...prev,
      materielConcerne: prev.materielConcerne.includes(materiel)
        ? prev.materielConcerne.filter(m => m !== materiel)
        : [...prev.materielConcerne, materiel]
    }));
  };

  const removeCible = (cible: string) => {
    setFormData(prev => ({
      ...prev,
      cibles: prev.cibles.filter(c => c !== cible)
    }));
  };

  const removeMateriel = (materiel: string) => {
    setFormData(prev => ({
      ...prev,
      materielConcerne: prev.materielConcerne.filter(m => m !== materiel)
    }));
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">
              {typeLeasing ? "Modifier le type de leasing" : "Nouveau type de leasing"}
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Configuration des paramètres du type de leasing
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Informations générales */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Informations générales</h3>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom du type *</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                  placeholder="ex: Crédit-bail, Location-vente..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="usage">Usage</Label>
                <Select value={formData.usage} onValueChange={(value: any) => setFormData(prev => ({ ...prev, usage: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner l'usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professionnel">Professionnel</SelectItem>
                    <SelectItem value="personnel">Personnel</SelectItem>
                    <SelectItem value="mixte">Mixte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description détaillée du type de leasing..."
                rows={3}
                required
              />
            </div>
          </div>

          {/* Section: Cibles */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Cibles</h3>
            </div>
            <Separator />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {CIBLES_OPTIONS.map((cible) => (
                <div key={cible} className="flex items-center space-x-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <Checkbox
                    id={`cible-${cible}`}
                    checked={formData.cibles.includes(cible)}
                    onCheckedChange={() => handleCibleToggle(cible)}
                  />
                  <Label htmlFor={`cible-${cible}`} className="text-sm font-medium cursor-pointer">
                    {cible}
                  </Label>
                </div>
              ))}
            </div>
            {formData.cibles.length > 0 && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Cibles sélectionnées :</p>
                <div className="flex flex-wrap gap-2">
                  {formData.cibles.map((cible) => (
                    <Badge key={cible} variant="secondary" className="flex items-center gap-1">
                      {cible}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => removeCible(cible)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Matériel concerné */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <Package className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Matériel concerné</h3>
            </div>
            <Separator />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {MATERIEL_OPTIONS.map((materiel) => (
                <div key={materiel} className="flex items-center space-x-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <Checkbox
                    id={`materiel-${materiel}`}
                    checked={formData.materielConcerne.includes(materiel)}
                    onCheckedChange={() => handleMaterielToggle(materiel)}
                  />
                  <Label htmlFor={`materiel-${materiel}`} className="text-sm font-medium cursor-pointer">
                    {materiel}
                  </Label>
                </div>
              ))}
            </div>
            {formData.materielConcerne.length > 0 && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Matériel sélectionné :</p>
                <div className="flex flex-wrap gap-2">
                  {formData.materielConcerne.map((materiel) => (
                    <Badge key={materiel} variant="secondary" className="flex items-center gap-1">
                      {materiel}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => removeMateriel(materiel)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Conditions contractuelles */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Conditions contractuelles</h3>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Achat du bien en fin de contrat</Label>
                <Select 
                  value={formData.achatBienFinContrat} 
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, achatBienFinContrat: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner l'option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="optionnel">Optionnel</SelectItem>
                    <SelectItem value="obligatoire">Obligatoire</SelectItem>
                    <SelectItem value="pas_option">Pas d'option d'achat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Options</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 rounded-lg border bg-card">
                    <Checkbox
                      id="parametrable"
                      checked={formData.parametrable}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, parametrable: checked as boolean }))}
                    />
                    <Label htmlFor="parametrable" className="font-medium cursor-pointer">Paramétrable</Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 rounded-lg border bg-card">
                    <Checkbox
                      id="actif"
                      checked={formData.actif}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, actif: checked as boolean }))}
                    />
                    <Label htmlFor="actif" className="font-medium cursor-pointer">Actif</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Commentaires */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Commentaires</h3>
            </div>
            <Separator />
            <Textarea
              value={formData.commentaires}
              onChange={(e) => setFormData(prev => ({ ...prev, commentaires: e.target.value }))}
              placeholder="Commentaires ou notes additionnelles sur ce type de leasing..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t">
            <Button type="submit" size="lg" className="flex-1">
              {typeLeasing ? "Modifier le type" : "Créer le type"}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={onCancel} className="flex-1">
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}