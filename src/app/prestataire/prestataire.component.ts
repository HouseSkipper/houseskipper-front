import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Prestataire} from '../interfaces/Prestataire';
import {PrestataireService} from '../services/prestataire.service';
import {HouseService} from '../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-prestataire',
  templateUrl: './prestataire.component.html',
  styleUrls: ['./prestataire.component.css']
})
export class PrestataireComponent implements OnInit {

    private _errorMsg = '';
    private _confirmMsg = '';
    private _form: FormGroup;
    private _professions: string [];
  constructor(private _prestataireService: PrestataireService, private _router: Router, private _route: ActivatedRoute) {
      this._form = this._buildForm();
      this._professions = [
          'Conducteur de Travaux (CdT)',
          'Courtier en Travaux (CeT)',
          'Conseiller-Expert (CE)',
          'Prestataire en travaux (PeT)',
          'Assureur (Ass)',
          'Juriste (Jur)',
      ];
  }

    private _buildForm(): FormGroup {
        return new FormGroup({
            profession: new FormControl(),
            nom: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            nomSociete: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            zipCode: new FormControl('00000', Validators.compose([
                Validators.pattern('\\d{5}')
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            commentaire: new FormControl()
        });
    }

    get professions(): string[] {
       return this._professions;
    }

    get form(): FormGroup {
        return this._form;
    }

  ngOnInit() {
  }

    get errorMsg(): string {
        return this._errorMsg;
    }

    get confirmMsg(): string {
        return this._confirmMsg;
    }

    submit (prestataire: Prestataire) {
      console.log(prestataire);
        if (this.verifieEmail(prestataire.email) === 'passe') {
            this._prestataireService.create(prestataire).subscribe( (_) => this._confirmMsg = 'Votre demande e été bien envoyé.',
                _ => this._errorMsg = 'Un partenaire est déjà inscrit avec cette email.',
                () =>
                    this._router.navigate([ '/login'])
                );
        } else {
          this._errorMsg = 'Email incorrect ! Veuillez s\'inscrir avec l\'email de l\'entreprise.';
      }
    }

    private verifieEmail(email: string): string {
        this._errorMsg = '';
        this._confirmMsg = '';
        if (email.includes('outlook') || email.includes('yahoo')) {
            return '';
        }
        return 'passe';
    }
}
