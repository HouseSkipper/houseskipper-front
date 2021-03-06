import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../services/budget.service';
import {DataSource} from '@angular/cdk/table';
import { Task} from '../interfaces/task';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {TasksService} from '../services/tasks.service';
import {Route, Router} from '@angular/router';
import {TaskDialogConfirmComponent} from '../task-dialog-confirm/task-dialog-confirm.component';
import {HouseDialogDelete} from '../houses/matDialog/delete/house.dialog.delete';
import {filter, flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {



    displayedColumns = ['Référence', 'Phase', 'Debut de la phase', 'Nom', 'Habitation concernée', 'Type travaux', 'Résultat attendu', 'file', 'delete'];
    taskList: Task[];
    dataSource: MatTableDataSource<Task>;
    private _files: string[];
    blogFile = { filename: '', file: ''};
    hasFile: boolean;
    private _errorMsg = '';
    private _taskDialogConfirm: MatDialogRef<TaskDialogConfirmComponent>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _dataService: TasksService, private _router: Router, private _dialog: MatDialog
                ) {
        this.hasFile = false;
    }

    get files(): string[] {
        return this._files;
    }
    ngOnInit() {
        new TaskDataSource(this._dataService).connect().subscribe(_ => {
            console.log(_);
                this.dataSource = new MatTableDataSource<Task>(_);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        );
    }

    get errorMsg(): string {
        return this._errorMsg;
    }
    deleteTask(task) {
        this._taskDialogConfirm = this._dialog.open(TaskDialogConfirmComponent, {
            width: '500px',
            disableClose: true,
            data: task,
            id: 'Suppression'
        });

        this._taskDialogConfirm.afterClosed()
            .pipe(
                filter(_ => !!_),
                flatMap(_ => this._dataService.remove(_))
            )
            .subscribe(null, null, () => this.ngOnInit());
        /*
        if (confirm('Êtes-vous sûr de vouloir supprimer la tâche ?')) {
            this._dataService.remove(id).subscribe(
                null,
                null,
                () => {
                    new TaskDataSource(this._dataService).connect().subscribe(_ => {
                            this.dataSource = new MatTableDataSource<Task>(_);
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                        }
                    );
                }
            );
        }
         */
    }


    editTask(task) {
        this._router.navigate(['/users/tasks/' + task.id]);
    }

    filesNames(id): void {
        this._errorMsg = '';
        this._dataService.getFiles(id).subscribe((_) => {
            this._files = _;
            this.hasFile = true;
        }, () => this._files = [], null);
    }

    downloadFile(file, id) {
        console.log(file + ', ' + id);
        this._dataService.downloadFileNow(file, id).subscribe(
            response => {
                if (this.blogFile.file.includes('png') || this.blogFile.file.includes('jpg')
                    || this.blogFile.file.includes('jpeg')) {
                this.downloadFileAs(response, 'image/jpg');
                } else if (this.blogFile.file.includes('pdf')) {
                    this.downloadFileAs(response, 'application/pdf');
                }
            },
            () => this._errorMsg = 'Veuillez choisir une image à télécharger.'
        );

    }


    addTask() {
        this._router.navigate(['/users/tasks/addtask']);
    }

    private downloadFileAs(data: any, type: string) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data], {type: type});
        const url = window.URL.createObjectURL(blob);
        const pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
            alert('Disable Pop-up');
        } else {
            a.href = url;
            a.download = this.blogFile.file;
            a.click();
        }
    }

    sortData(sort: Sort) {
        const data = this.dataSource.data.slice();
        if (!sort.active || sort.direction === '') {
            this.dataSource.data = data;
            return;
        }

        this.dataSource.data = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'Référence': return compare(a.id, b.id, isAsc);
                case 'Etat': return compare(a.status.phaseName, b.status.phaseName, isAsc);
                case 'Nom': return compare(a.nom, b.nom, isAsc);
                default: return 0;
            }
        });
    }

    nextStep(task) {
        this._taskDialogConfirm = this._dialog.open(TaskDialogConfirmComponent, {
            width: '500px',
            disableClose: true,
            data: task,
            id: 'Confirmation'
        });
        this._taskDialogConfirm.afterClosed()
            .pipe(
                filter(_ => !!_),
                flatMap(_ => this._dataService.nextPhase(_))
            )
            .subscribe(null, null, () => location.reload());
        /*

        if (confirm('Êtes-vous sûr de vouloir passer à l\'étape suivante ?')) {
            this._dataService.nextPhase(task).subscribe(_ => console.log(_), null, () => location.reload());
        }
         */

    }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


export class TaskDataSource extends DataSource<any> {
    constructor(private _dataService: TasksService) {
        super();
    }

    connect(): Observable<Task[]> {
        return this._dataService.getAll();
    }
    disconnect() {
    }
}
