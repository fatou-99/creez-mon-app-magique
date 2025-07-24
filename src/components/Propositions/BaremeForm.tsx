
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { BaremeComplet } from "@/types/leasing";
import { CalendarIcon, Save, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BaremeFormProps {
  bareme?: BaremeComplet | null;
  onSave: (bareme: Omit<BaremeComplet, 'id'>) => void;
  onCancel: () => void;
  clientId?: string;
}

const BaremeForm = ({ bareme, onSave, onCancel, clientId }: BaremeFormProps) => {
  const [formData, setFormData] = useState({
    nom: bareme?.nom || "",
    type: bareme?.type || "derogatoire" as const,
    taux: bareme?.taux?.toString() || "",
    
    valeurResiduelle: bareme?.valeurResiduelle?.toString() || "",
    typologie: bareme?.typologie || "Crédit-Bail",
    dureeDefaut: bareme?.dureeDefaut?.toString() || "",
    dureeMin: bareme?.dureeMin?.toString() || "",
    dureeMax: bareme?.dureeMax?.toString() || "",
    applicationUniqueDossier: bareme?.applicationUniqueDossier || false,
    dossierUniqueId: bareme?.dossierUniqueId || "",
    dateApplication: bareme?.dateApplication || null,
    dateFin: bareme?.dateFin || null,
    actif: bareme?.actif ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.taux || !formData.valeurResiduelle) {
      return;
    }

    const newBareme: Omit<BaremeComplet, 'id'> = {
      nom: formData.nom,
      type: formData.type,
      taux: parseFloat(formData.taux),
      marge: 0, // Valeur par défaut
      valeurResiduelle: parseFloat(formData.valeurResiduelle),
      typologie: formData.typologie,
      dureeDefaut: formData.dureeDefaut ? parseInt(formData.dureeDefaut) : undefined,
      dureeMin: formData.dureeMin ? parseInt(formData.dureeMin) : undefined,
      dureeMax: formData.dureeMax ? parseInt(formData.dureeMax) : undefined,
      dateCreation: new Date(),
      actif: formData.actif,
      statut: "active",
      applicationUniqueDossier: formData.applicationUniqueDossier,
      clientId: clientId,
      dossierUniqueId: formData.applicationUniqueDossier ? formData.dossierUniqueId : undefined,
      // Les dates ne sont définies que si ce n'est pas un dossier unique
      dateApplication: !formData.applicationUniqueDossier ? formData.dateApplication : undefined,
      dateFin: !formData.applicationUniqueDossier ? formData.dateFin : undefined
    };

    onSave(newBareme);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {bareme ? 'Modifier le barème' : 'Nouveau barème dérogatoire'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom du barème *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                placeholder="Ex: Barème Client VIP"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="typologie">Typologie</Label>
              <Select 
                value={formData.typologie} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, typologie: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Crédit-Bail">Crédit-Bail</SelectItem>
                  <SelectItem value="Location">Location</SelectItem>
                  <SelectItem value="Financement">Financement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taux">Taux effectif global (%) *</Label>
              <Input
                id="taux"
                type="number"
                step="0.1"
                value={formData.taux}
                onChange={(e) => setFormData(prev => ({ ...prev, taux: e.target.value }))}
                placeholder="4.5"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valeurResiduelle">Valeur résiduelle (%) *</Label>
              <Input
                id="valeurResiduelle"
                type="number"
                step="0.1"
                value={formData.valeurResiduelle}
                onChange={(e) => setFormData(prev => ({ ...prev, valeurResiduelle: e.target.value }))}
                placeholder="1.5"
                required
              />
            </div>
          </div>

          {/* Configuration des durées */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Configuration des durées (en mois)</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dureeDefaut">Durée par défaut</Label>
                <Input
                  id="dureeDefaut"
                  type="number"
                  value={formData.dureeDefaut}
                  onChange={(e) => setFormData(prev => ({ ...prev, dureeDefaut: e.target.value }))}
                  placeholder="60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dureeMin">Durée minimum</Label>
                <Input
                  id="dureeMin"
                  type="number"
                  value={formData.dureeMin}
                  onChange={(e) => setFormData(prev => ({ ...prev, dureeMin: e.target.value }))}
                  placeholder="12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dureeMax">Durée maximum</Label>
                <Input
                  id="dureeMax"
                  type="number"
                  value={formData.dureeMax}
                  onChange={(e) => setFormData(prev => ({ ...prev, dureeMax: e.target.value }))}
                  placeholder="84"
                />
              </div>
            </div>
            
            {/* Affichage de la plage autorisée */}
            {(formData.dureeMin && formData.dureeMax) && (
              <div className="text-sm text-muted-foreground">
                Plage autorisée : {formData.dureeMin} - {formData.dureeMax} mois
              </div>
            )}
          </div>

          {/* Case à cocher pour dossier unique */}
          <div className="flex items-center space-x-2 p-4 border rounded-lg bg-yellow-50">
            <Checkbox
              id="applicationUniqueDossier"
              checked={formData.applicationUniqueDossier}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ 
                  ...prev, 
                  applicationUniqueDossier: checked as boolean,
                  // Reset des dates si on passe en dossier unique
                  dateApplication: checked ? null : prev.dateApplication,
                  dateFin: checked ? null : prev.dateFin
                }))
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label 
                htmlFor="applicationUniqueDossier"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Est-ce que ce barème est à appliquer sur un seul dossier ?
              </Label>
              <p className="text-xs text-muted-foreground">
                Si oui, ce barème ne sera applicable qu'à un dossier spécifique
              </p>
            </div>
          </div>

          {/* Champ ID dossier unique - affiché seulement si case cochée */}
          {formData.applicationUniqueDossier && (
            <div className="space-y-2">
              <Label htmlFor="dossierUniqueId">ID du dossier unique *</Label>
              <Input
                id="dossierUniqueId"
                value={formData.dossierUniqueId}
                onChange={(e) => setFormData(prev => ({ ...prev, dossierUniqueId: e.target.value }))}
                placeholder="Ex: DOSS-2024-001"
                required={formData.applicationUniqueDossier}
              />
            </div>
          )}

          {/* Dates - masquées si dossier unique */}
          {!formData.applicationUniqueDossier && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date d'application (début)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dateApplication && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateApplication ? (
                        format(formData.dateApplication, "dd/MM/yyyy")
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dateApplication || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateApplication: date || null }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Date de fin</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dateFin && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateFin ? (
                        format(formData.dateFin, "dd/MM/yyyy")
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dateFin || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateFin: date || null }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                      disabled={(date) => 
                        formData.dateApplication ? date < formData.dateApplication : false
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {bareme ? 'Modifier' : 'Créer'} le barème
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BaremeForm;
