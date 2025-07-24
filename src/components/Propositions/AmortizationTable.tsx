
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
  capitalDebPeriode: number;
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
  montant = 50000000, 
  duree = 36,
  taux = 7.5,
  className,
  clientName = "Client",
  materialType = "Matériel",
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
        capitalDebPeriode: remainingCapital,
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

  if (!showDetails) {
    // Vue résumé similaire à l'image uploadée
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
              onClick={() => setShowDetails(true)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Voir détails
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Vue tableau style formulaire */}
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
  }

  // Vue détaillée avec tableau d'amortissement complet
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tableau d'Amortissement - Détails
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowDetails(false)}
            className="flex items-center gap-2"
          >
            <EyeOff className="h-4 w-4" />
            Masquer détails
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Résumé du financement */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Résumé du financement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Montant financement :</span>
              <span className="font-medium">{formatCurrency(montant)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Taux d'intérêt :</span>
              <span className="font-medium">{taux}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Périodicité :</span>
              <span className="font-medium">Mensuelle</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Durée :</span>
              <span className="font-medium">{duree} mois</span>
            </div>
          </div>
        </div>

        {/* Tableau d'amortissement complet */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center font-medium">Échéance</TableHead>
                <TableHead className="text-right font-medium">Capital deb période</TableHead>
                <TableHead className="text-right font-medium">Capital remb</TableHead>
                <TableHead className="text-right font-medium">Intérêt</TableHead>
                <TableHead className="text-right font-medium">Annuité</TableHead>
                <TableHead className="text-right font-medium">Capital restant du</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {amortizationData.map((row, index) => (
                <TableRow key={row.echeance} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                  <TableCell className="text-center font-medium">{row.echeance}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.capitalDebPeriode)}</TableCell>
                  <TableCell className="text-right text-primary font-medium">{formatCurrency(row.capitalRemb)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.interet)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(row.annuite)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.capitalRestantDu)}</TableCell>
                </TableRow>
              ))}
              {/* Ligne des totaux */}
              <TableRow className="bg-primary/10 font-medium border-t-2">
                <TableCell className="text-center">Total</TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right">{formatCurrency(montant)}</TableCell>
                <TableCell className="text-right">{formatCurrency(totalInterets)}</TableCell>
                <TableCell className="text-right">{formatCurrency(totalAnnuites)}</TableCell>
                <TableCell className="text-right">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-4 justify-center pt-4">
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
