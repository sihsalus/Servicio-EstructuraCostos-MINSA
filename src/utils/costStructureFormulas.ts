
//functions for porrateo cost
export function calculateInductor(weigth: number, area: number): number {
  return weigth * area;
}

export function calculatePorrateo(induct: number, totalInduc:number,annualCost: number){
    if(totalInduc == 0) return 0;
    return (induct / totalInduc) * annualCost;
}

export function calculatePorrateoGeneral(annualCost: number, totalArea: number, area: number): number {
    if(totalArea == 0)return 0;
    return (area / totalArea) * annualCost;
}

export function calculateUniCostPorrateo(asignedCost: number, productionProyected: number): number {
  if (productionProyected <= 0) return 0;
  return asignedCost / productionProyected;
}