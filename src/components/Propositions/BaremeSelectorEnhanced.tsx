
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BaremeComplet, Campagne, Convention } from "@/types/leasing";
import { Calculator, Star, AlertTriangle, Trophy, CheckCircle } from "lucide-react";

interface BaremeSelectorEnhancedProps {
  selectedBareme: BaremeComplet | null;
  onBaremeSelect: (bareme: BaremeComplet) => void;
  clientId?: string;
  campagne?: Campagne | null;
  convention?: Convention | null;
}

// Données de démonstration pour les barèmes dérogatoires du client
const getClientBaremes = (clientId?: string): BaremeComplet[] => {
  // Retourner des barèmes par défaut même sans clientId pour la démonstration
  return [
    {
      id: "bar-client-002",
      nom: "Barème Exceptionnel Dossier Unique",
      type: "derogatoire",
      taux: 3.8,
      marge: 1.5,
      valeurResiduelle: 0.8,
      typologie: "Crédit-Bail",
      dateCreation: new Date("2024-03-01"),
      dateApplication: new Date("2024-03-15"),
      actif: true,
      statut: "active",
      clientId: clientId || "demo-client",
      applicationUniqueDossier: true,
      dossierUniqueId: "DOSS-2024-001"
    },
    {
      id: "bar-client-001",
      nom: "Barème Dérogatoire Client VIP",
      type: "derogatoire",
      taux: 4.2,
      marge: 1.8,
      valeurResiduelle: 1.2,
      typologie: "Crédit-Bail",
      dateCreation: new Date("2024-01-01"),
      dateApplication: new Date("2024-01-15"),
      actif: true,
      statut: "active",
      clientId: clientId || "demo-client",
      applicationUniqueDossier: false
    }
  ];
};

const BaremeSelectorEnhanced = ({
  selectedBareme,
  onBaremeSelect,
  clientId,
  campagne,
  convention
}: BaremeSelectorEnhancedProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<{
    baremeClient: BaremeComplet;
    baremeCampagne: BaremeComplet;
  } | null>(null);

  const clientBaremes = getClientBaremes(clientId);
  
  // Trier les barèmes : dossier unique en premier et auto-sélectionner
  const sortedClientBaremes = [...clientBaremes].sort((a, b) => {
    if (a.applicationUniqueDossier && !b.applicationUniqueDossier) return -1;
    if (!a.applicationUniqueDossier && b.applicationUniqueDossier) return 1;
    return 0;
  });
  
  // Barème de campagne par défaut
  const baremeCampagne = campagne ? {
    id: "bar-campagne",
    nom: `Barème ${campagne.nom}`,
    type: "derogatoire" as const,
    taux: campagne.bareme.taux,
    marge: campagne.bareme.marge,
    valeurResiduelle: campagne.bareme.valeurResiduelle,
    typologie: "Crédit-Bail",
    dateCreation: new Date(),
    actif: true,
    statut: "active" as const
  } : {
    id: "bar-campagne-default",
    nom: "Barème Campagne Été 2024",
    type: "derogatoire" as const,
    taux: 4.5,
    marge: 2,
    valeurResiduelle: 1,
    typologie: "Crédit-Bail",
    dateCreation: new Date(),
    actif: true,
    statut: "active" as const
  };

  // Barème de convention
  const baremeConvention = convention ? {
    id: "bar-convention",
    nom: `Barème ${convention.nom}`,
    type: "derogatoire" as const,
    taux: convention.bareme.taux,
    marge: convention.bareme.marge,
    valeurResiduelle: convention.bareme.valeurResiduelle,
    typologie: "Crédit-Bail",
    dateCreation: new Date(),
    actif: true,
    statut: "active" as const
  } : null;

  const handleBaremeSelect = (bareme: BaremeComplet) => {
    // Si on sélectionne un barème de campagne/convention et que le client a un barème plus favorable
    if ((bareme.id === "bar-campagne" || bareme.id === "bar-campagne-default" || bareme.id === "bar-convention") && clientBaremes.length > 0) {
      // Prendre automatiquement le barème dossier unique s'il existe, sinon le meilleur barème
      const dossierUniqueBareme = clientBaremes.find(b => b.applicationUniqueDossier);
      const bestClientBareme = dossierUniqueBareme || clientBaremes.reduce((best, current) => 
        current.taux < best.taux ? current : best
      );
      
      if (bestClientBareme.taux < bareme.taux) {
        setAlertData({
          baremeClient: bestClientBareme,
          baremeCampagne: bareme
        });
        setShowAlert(true);
        return;
      }
    }
    
    onBaremeSelect(bareme);
  };

  const handleContinueWithCampagne = () => {
    if (alertData) {
      onBaremeSelect(alertData.baremeCampagne);
    }
    setShowAlert(false);
    setAlertData(null);
  };

  const handleUseClientBareme = () => {
    if (alertData) {
      onBaremeSelect(alertData.baremeClient);
    }
    setShowAlert(false);
    setAlertData(null);
  };

  // Auto-sélection du barème de campagne par défaut
  React.useEffect(() => {
    if (baremeCampagne && !selectedBareme) {
      // Vérifier s'il y a un barème client plus favorable
      if (clientBaremes.length > 0) {
        // Prendre automatiquement le barème dossier unique s'il existe, sinon le meilleur barème
        const dossierUniqueBareme = clientBaremes.find(b => b.applicationUniqueDossier);
        const bestClientBareme = dossierUniqueBareme || clientBaremes.reduce((best, current) => 
          current.taux < best.taux ? current : best
        );
        
        if (bestClientBareme.taux < baremeCampagne.taux) {
          setAlertData({
            baremeClient: bestClientBareme,
            baremeCampagne: baremeCampagne
          });
          setShowAlert(true);
          return;
        }
      }
      onBaremeSelect(baremeCampagne);
    }
  }, [baremeCampagne, selectedBareme, clientBaremes, onBaremeSelect]);

  return (
    <div className="space-y-6">
      {showAlert && alertData && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">
              Voulez-vous vous enrôler pour la campagne ou utiliser le barème dérogatoire ?
            </CardTitle>
            <div className="flex gap-3 mt-4">
              <Badge variant="outline" className="bg-white">
                Campagne: {alertData.baremeCampagne.taux}%
              </Badge>
              <Badge variant="outline" className="bg-white">
                Dérogatoire: {alertData.baremeClient.taux}%
              </Badge>
            </div>
            <div className="flex gap-3 mt-4">
              <Button 
                variant="outline" 
                onClick={handleContinueWithCampagne}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                Choisir Campagne
              </Button>
              <Button 
                onClick={handleUseClientBareme}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Choisir Dérogatoire
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Sélection du Barème
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Colonne de gauche : Barème de campagne/convention (par défaut) */}
            <div className="space-y-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Barème par Défaut
              </h4>

              {/* Barème de campagne par défaut */}
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedBareme?.id === baremeCampagne.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleBaremeSelect(baremeCampagne)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h5 className="font-medium mb-2">{baremeCampagne.nom}</h5>
                    <div className="text-sm mb-3">
                      <span className="text-muted-foreground">Taux effectif global:</span>
                      <div className="font-semibold text-lg">{baremeCampagne.taux}%</div>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      Barème Campagne
                    </Badge>
                  </div>
                  {selectedBareme?.id === baremeCampagne.id && (
                    <Badge variant="default" className="text-xs">
                      Sélectionné
                    </Badge>
                  )}
                </div>
              </div>

              {/* Barème de convention */}
              {baremeConvention && (
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedBareme?.id === baremeConvention.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleBaremeSelect(baremeConvention)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-medium mb-2">{baremeConvention.nom}</h5>
                      <div className="text-sm mb-3">
                        <span className="text-muted-foreground">Taux effectif global:</span>
                        <div className="font-semibold text-lg">{baremeConvention.taux}%</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Barème Convention
                      </Badge>
                    </div>
                    {selectedBareme?.id === baremeConvention.id && (
                      <Badge variant="default" className="text-xs">
                        Sélectionné
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Colonne de droite : Barèmes dérogatoires client */}
            <div className="space-y-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Barèmes Dérogatoires Client
              </h4>

              <div className="space-y-3">
                {sortedClientBaremes.map((bareme) => (
                  <div
                    key={bareme.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedBareme?.id === bareme.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => onBaremeSelect(bareme)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-medium">{bareme.nom}</h5>
                          {bareme.applicationUniqueDossier && (
                            <Trophy className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        
                        <div className="text-sm mb-3">
                          <span className="text-muted-foreground">Taux effectif global:</span>
                          <div className="font-semibold text-lg text-green-600">{bareme.taux}%</div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {bareme.applicationUniqueDossier ? (
                            <Badge variant="destructive" className="text-xs">
                              Dossier Unique
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Dérogatoire
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {bareme.typologie}
                          </Badge>
                        </div>

                        {bareme.applicationUniqueDossier && bareme.dossierUniqueId && (
                          <div className="text-xs text-muted-foreground mt-2">
                            <span className="font-medium">Dossier:</span> {bareme.dossierUniqueId}
                          </div>
                        )}
                      </div>
                      
                      {selectedBareme?.id === bareme.id && (
                        <Badge variant="default" className="text-xs">
                          Sélectionné
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section détaillée du barème sélectionné */}
      {selectedBareme && selectedBareme.type === "derogatoire" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Détails du Barème Sélectionné
              </div>
              <div className="flex items-center gap-2">
                {selectedBareme.id === "bar-campagne" || selectedBareme.id === "bar-campagne-default" ? (
                  <Badge variant="destructive" className="text-xs">
                    🎯 Choix Campagne
                  </Badge>
                ) : selectedBareme.type === "derogatoire" && (selectedBareme.id === "bar-client-001" || selectedBareme.id === "bar-client-002") ? (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    ⭐ Choix Dérogatoire
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    📋 Barème Standard
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Périodicité loyer</label>
                <div className="p-3 border rounded bg-gray-50">
                  <span className="text-sm">1</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Terme</label>
                <div className="p-3 border rounded bg-gray-50">
                  <span className="text-sm">60 mois</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Nombre de périodes</label>
                <div className="p-3 border rounded bg-gray-50">
                  <span className="text-sm">60</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Méthode de calcul des loyers</label>
                <div className="p-3 border rounded bg-gray-50">
                  <span className="text-sm">constant</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Taux standard (%)</label>
                <div className="p-3 border rounded">
                  <span className="font-semibold">{selectedBareme.taux}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Marge standard (%)</label>
                <div className="p-3 border rounded">
                  <span className="font-semibold">{selectedBareme.marge}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Valeur résiduelle (%)</label>
                <div className="p-3 border rounded">
                  <span className="font-semibold">{selectedBareme.valeurResiduelle}</span>
                </div>
              </div>
            </div>

            {/* Section dates - masquée pour les barèmes dossier unique */}
            {!selectedBareme.applicationUniqueDossier && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Date d'application</label>
                  <div className="p-3 border rounded bg-gray-50">
                    <span className="text-sm">
                      {selectedBareme.dateApplication?.toLocaleDateString('fr-FR') || 'Non définie'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Date de fin</label>
                  <div className="p-3 border rounded bg-gray-50">
                    <span className="text-sm">
                      {selectedBareme.dateFin?.toLocaleDateString('fr-FR') || 'Non définie'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Informations spécifiques au dossier unique */}
            {selectedBareme.applicationUniqueDossier && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Barème Dossier Unique</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Ce barème est exclusivement applicable au dossier : <strong>{selectedBareme.dossierUniqueId}</strong>
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Les dates d'application et de fin ne s'appliquent pas aux barèmes dossier unique.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Premier loyer HT (FCFA)</label>
                <div className="p-3 border rounded bg-gray-50">
                  <span className="text-sm">750 000</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Montant VR (FCFA)</label>
                <div className="p-3 border rounded bg-gray-50">
                  <span className="text-sm">1 200 000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BaremeSelectorEnhanced;
