import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-metric',
  templateUrl: './budget-metric.component.html',
  styleUrls: ['./budget-metric.component.css']
})
export class BudgetMetricComponent implements OnInit {

    /**
     * Charts param
     */
    public doughnutChartLabels: string[] = ['Gros oeuvre', 'Second oeuvre', 'Petits travaux', 'Aménagement paysager'];
    public doughnutChartData: number[] = [350, 450, 100, 100];
    public barChartOptions: any = {
        legend: {
            position: 'right',
            labels : {
              fontColor: 'white'
            }
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }
    }
    public doughnutChartType = 'pie';

    /**
     * Attribute
     */
    private _activeMenu: string;

  constructor() { }

  ngOnInit() {
      this.setActive('Mois');
  }


    setActive(button: string) {
        this._activeMenu = button;
        switch (this._activeMenu) {
            case 'Mois':
                // this.getMonthCurrentPhases();
                break;
            case 'Annee':
                // this.getYearCurrentPhases();
                break;
            case 'Tous' :
                // this.getAllCurrentPhases();
                break;
        }
    }


    get activeMenu(): string {
        return this._activeMenu;
    }
}
