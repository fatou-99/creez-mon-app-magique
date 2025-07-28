
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calculator, Save, Send, Eye, EyeOff } from "lucide-react";

interface AmortizationRowProps {
  echeance: number;
  capitalRemb: number;
  interet: number;
  annuite: number;
  capitalRestantDu: number;
}

interface AmortizationTableProps {
  montant?: number;
  duree?: number;
  taux?: number;
  className?: string;
  clientName?: string;
  materialType?: string;
  onSaveDraft?: () => void;
  onSendForValidation?: () => void;
}

const AmortizationTable = ({ 
  montant = 141959560, 
  duree = 36,
  taux = 7.5,
  className,
  clientName = "BAPA BA BOUMTJE",
  materialType = "Pick up",
  onSaveDraft,
  onSendForValidation
}: AmortizationTableProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('XOF', 'FCFA');
  };

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('fr-FR');
  };

  const calculateTTC = (ht: number) => {
    return ht * 1.18; // TVA 18%
  };

  // Calculs des valeurs du financement
  const depotGarantie = montant * 0.05; // 5%
  const premierLoyerMajore = montant * 0.25; // 25%
  const valeurResiduelle = montant * 0.05; // 5%
  const loyerMensuel = 3383327; // Valeur fixe comme dans l'image

  const calculateAmortization = (): AmortizationRowProps[] => {
    const monthlyRate = taux / 100 / 12;
    const monthlyPayment = (montant * monthlyRate * Math.pow(1 + monthlyRate, duree)) / 
                          (Math.pow(1 + monthlyRate, duree) - 1);
    
    const rows: AmortizationRowProps[] = [];
    let remainingCapital = montant;

    for (let i = 1; i <= duree; i++) {
      const interest = remainingCapital * monthlyRate;
      const principal = monthlyPayment - interest;
      const newRemainingCapital = remainingCapital - principal;

      rows.push({
        echeance: i,
        capitalRemb: principal,
        interet: interest,
        annuite: monthlyPayment,
        capitalRestantDu: Math.max(0, newRemainingCapital)
      });

      remainingCapital = newRemainingCapital;
    }

    return rows;
  };

  const amortizationData = calculateAmortization();
  const totalInterets = amortizationData.reduce((sum, row) => sum + row.interet, 0);
  const totalAnnuites = amortizationData.reduce((sum, row) => sum + row.annuite, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tableau d'Amortissement
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2"
          >
            {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showDetails ? "Masquer détails" : "Voir détails"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section principale - Informations client et financement */}
        <div className="border rounded-lg overflow-hidden">
          {/* Header avec date */}
          <div className="bg-muted/50 p-3 border-b">
            <div className="text-right text-sm font-medium">
              {getCurrentDate()}
            </div>
          </div>
          
          {/* Grille style formulaire */}
          <div className="divide-y">
            {/* Nom du client */}
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 p-3 bg-muted/30 font-medium border-r">
                Nom du client
              </div>
              <div className="col-span-9 p-3 flex items-center">
                <div className="w-full text-center font-medium text-lg">
                  {clientName}
                </div>
              </div>
            </div>
            
            {/* Type de matériel */}
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 p-3 bg-muted/30 font-medium border-r">
                Type de matériel :
              </div>
              <div className="col-span-9 p-3 flex items-center">
                <div className="w-full text-center font-medium text-lg">
                  {materialType}
                </div>
              </div>
            </div>
            
            {/* Prix du matériel financé */}
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 p-3 bg-muted/30 font-medium border-r">
                Prix du matériel financé HT
              </div>
              <div className="col-span-5 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(montant)}
                </div>
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(calculateTTC(montant))}
                </div>
              </div>
              <div className="col-span-1 p-3 flex items-center justify-center">
                <span className="font-medium">TTC</span>
              </div>
            </div>
            
            {/* Montant du financement */}
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 p-3 bg-muted/30 font-medium border-r">
                Montant du financement HT
              </div>
              <div className="col-span-5 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(montant)}
                </div>
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(calculateTTC(montant))}
                </div>
              </div>
              <div className="col-span-1 p-3 flex items-center justify-center">
                <span className="font-medium">TTC</span>
              </div>
            </div>
            
            {/* Durée */}
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 p-3 bg-muted/30 font-medium border-r">
                Durée
              </div>
              <div className="col-span-9 p-3 flex items-center justify-center">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {duree}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section des garanties et loyers */}
        <div className="border rounded-lg overflow-hidden">
          <div className="divide-y">
            {/* Headers */}
            <div className="grid grid-cols-12 min-h-[40px] bg-muted/50">
              <div className="col-span-3 p-3 font-medium border-r"></div>
              <div className="col-span-3 p-3 font-medium border-r text-center">%</div>
              <div className="col-span-3 p-3 font-medium border-r text-center">Montant</div>
              <div className="col-span-3 p-3 font-medium text-center">TTC</div>
            </div>
            
            {/* Dépôt de garantie */}
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 p-3 bg-muted/30 font-medium border-r">
                Dépôt de garantie
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  5,00%
                </div>
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(depotGarantie)}
                </div>
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(calculateTTC(depotGarantie))}
                </div>
              </div>
            </div>
            
            {/* Premier loyer majoré */}
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 p-3 bg-muted/30 font-medium border-r">
                Premier loyer majoré HT
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  25,00%
                </div>
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(premierLoyerMajore)}
                </div>
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(calculateTTC(premierLoyerMajore))}
                </div>
              </div>
            </div>
            
            {/* Valeur résiduelle */}
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 p-3 bg-muted/30 font-medium border-r">
                Valeur résiduelle HT
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  5,00%
                </div>
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center border-r">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(valeurResiduelle)}
                </div>
              </div>
              <div className="col-span-3 p-3 flex items-center justify-center">
                <div className="border border-border px-4 py-2 bg-background rounded">
                  {formatNumber(calculateTTC(valeurResiduelle))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section loyer mensuel */}
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 min-h-[40px]">
            <div className="col-span-3 p-3 bg-muted/30 font-medium border-r">
              Loyer mensuel HT
            </div>
            <div className="col-span-5 p-3 flex items-center justify-center border-r">
              <div className="border border-border px-4 py-2 bg-background rounded font-medium text-lg">
                {formatNumber(loyerMensuel)}
              </div>
            </div>
            <div className="col-span-3 p-3 flex items-center justify-center border-r">
              <div className="border border-border px-4 py-2 bg-background rounded font-medium text-lg">
                {formatNumber(calculateTTC(loyerMensuel))}
              </div>
            </div>
            <div className="col-span-1 p-3 flex items-center justify-center">
              <span className="font-medium">TTC</span>
            </div>
          </div>
        </div>

        {/* Tableau d'amortissement si détails activés */}
        {showDetails && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tableau d'Amortissement</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center font-medium">Échéance</TableHead>
                    <TableHead className="text-right font-medium">Principal</TableHead>
                    <TableHead className="text-right font-medium">Intérêt</TableHead>
                    <TableHead className="text-right font-medium">Loyer à payer</TableHead>
                    <TableHead className="text-right font-medium">Capital restant du</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortizationData.slice(0, 7).map((row, index) => (
                    <TableRow key={row.echeance} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                      <TableCell className="text-center font-medium">{row.echeance}</TableCell>
                      <TableCell className="text-right text-primary font-medium">{formatCurrency(row.capitalRemb)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.interet)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(row.annuite)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.capitalRestantDu)}</TableCell>
                    </TableRow>
                  ))}
                  {amortizationData.length > 7 && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-2">
                        ... et {amortizationData.length - 7} autres échéances
                      </TableCell>
                    </TableRow>
                  )}
                  {/* Ligne des totaux */}
                  <TableRow className="bg-primary/10 font-medium border-t-2">
                    <TableCell className="text-center">Total</TableCell>
                    <TableCell className="text-right">{formatCurrency(montant)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(totalInterets)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(totalAnnuites)}</TableCell>
                    <TableCell className="text-right">-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex gap-4 justify-center pt-6">
          <Button variant="outline" onClick={onSaveDraft} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Sauvegarder en brouillon
          </Button>
          <Button onClick={onSendForValidation} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Envoyer pour validation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmortizationTable;
