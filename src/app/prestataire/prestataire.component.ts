import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Prestataire} from '../interfaces/Prestataire';
import {PrestataireService} from '../services/prestataire.service';
import {HouseService} from '../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {BeforeLoginDialogComponent} from '../before-login-dialog/before-login-dialog.component';

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
  constructor(private _prestataireService: PrestataireService, private _router: Router,
              private _route: ActivatedRoute, private _dialog: MatDialog) {
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

    openChoiceModal() {
        this._router.navigate(['/login']);
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
            commentaire: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ]))
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
      let message = this.verifie(prestataire);
        if (message === 'passe') {
            this._prestataireService.create(prestataire).subscribe( null,
                _ => this._errorMsg = 'Un partenaire est déjà inscrit avec cette email.',
                () => {
                    this._router.navigate([ '/login']);
                    this._confirmMsg = 'Votre demande e été bien envoyé.';
                }
                );
        } else if (message === 'email') {
          this._errorMsg = 'Email incorrect ! Veuillez s\'inscrir avec l\'email de l\'entreprise.';
      } else if (message === 'invalide') {
            this._errorMsg = 'Tous les champs sont obligatoires.';
        }
    }

    private verifie(presetataire: Prestataire): string {
        this._errorMsg = '';
        this._confirmMsg = '';
        if (presetataire.email.includes('outlook') || presetataire.email.includes('yahoo')) {
            return 'email';
        }
        if (presetataire.commentaire === '' || presetataire.email === '' || presetataire.nom === '' || presetataire.nomSociete === ''
            || presetataire.profession === '' || presetataire.zipCode === '00000') {
            return 'invalide';
        }
        return 'passe';
    }
}
