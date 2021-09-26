import {
    Component, Input, Output, TemplateRef, ApplicationRef, EventEmitter, ChangeDetectorRef,
    ChangeDetectionStrategy, ViewChild, AfterViewInit
} from '@angular/core';
import { PipeTransform, OnInit, OnDestroy, Optional } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Observable, Subscription, BehaviorSubject, merge } from 'rxjs';
import { MatTableEmitter } from "./custom-mat-table.emitter";

import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortable } from '@angular/material/sort';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

export class MatTableColumnDefinition {
    public name: string = '';
    public value: string = '';
    public binding: string = '';
    public filter?: string = '';
    public computedClass?: any;
    public isComputed?: boolean = false;
    public isNumeric?: boolean = false;
    public isAnchor?: boolean = false;
    public isAnchorComputed?: string = '';
    public isWatched?: boolean = true;
    public isHoverOver?: boolean = false;
    public isCheckbox?: boolean = false;
    public isDisabledCheckbox?: boolean = false;
    public isExclusive?: boolean = false;
    public isSelected?: boolean = true;
    public isSortDisabled?: boolean = false;
    public hoverVisibility?: string = '';
    public hoverBinding?: string = '';
    public routerLink?: string = '';
    public queryParams?: string = '';
    public hyperLink?: string = '';
    public hyperLinkTarget: string = '_blank';
    public style?: any;
    public templateRef: TemplateRef<any>;

    public constructor(init?: Partial<MatTableColumnDefinition>) {
        Object.assign(this, init);
    }
}

export enum MatTableCustomAction {
    Button,
    Anchor
}

export class MatTableConfig {
    public sortBy: string = '';
    public sortDirection: string = 'desc';
    public pageSize: number = 100;
    public pageNumber: number = 1;
    public totalCount: number = 0;
    public totalPages: number = 0;
    public lowerRange: number = 0;
    public upperRange: number = 0;
    public maxSize: number = 10;
    public showSelectCheckbox: boolean = true;
    public showSelectAll: boolean = true;
    public showEdit: boolean = false;
    public showToggle: boolean = false;
    public showSort: boolean = true;
    public showPagination: boolean = true;
    public clientSortPage: boolean = true;
    public showDelete: boolean = false;
    public showDisplay: boolean = false;
    public showCustomAction: boolean = false;

    public constructor(init?: Partial<MatTableConfig>) {
        Object.assign(this, init);
    }
}

export class MatTableOptions {
    public records: Observable<Array<any>>;
    public selection?: SelectionModel<any> = new SelectionModel<any>(true, []);
    public columns: Array<MatTableColumnDefinition>;
    public secondaryColumns?: Array<MatTableColumnDefinition>;
    public rowDefns?: Array<any> = [];
    public config: MatTableConfig = new MatTableConfig();
    public callbacks?: any;
    public customActionTitle?: string = "View";
    public customActionHeaderTitle?: string = "Action";
    public customActionType?: MatTableCustomAction = MatTableCustomAction.Button;

    public constructor(init?: Partial<MatTableOptions>) {
        Object.assign(this, init);
    }
}

@Component({
    selector: 'custom-mat-table',
    templateUrl: './custom-mat-table.component.html',
    styleUrls: ['./custom-mat-table.component.scss'],
    providers: [CurrencyPipe, DatePipe, DecimalPipe, PercentPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomMatTableComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort, { static: true }) matSort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @Input() options: MatTableOptions;
    @Output() sortPageChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() selectionChange: EventEmitter<SelectionChange<any>> = new EventEmitter<SelectionChange<any>>();

    private subscription: Subscription;
    public isMatTable: boolean = true;
    public canSelect: boolean = false;
    public canEdit: boolean = false;
    public canToggle: boolean = false;
    public canDelete: boolean = false;
    public canDisplay: boolean = false;
    public customAction: boolean = false;
    public customActionType: MatTableCustomAction = MatTableCustomAction.Button;

    public get MatTableCustomAction() {
        return MatTableCustomAction;
    }

    // Props for Material Table
    public primaryDisplayedColumns: Array<string> = new Array<string>();
    public secondaryDisplayedColumns: Array<string> = new Array<string>();
    public dataSource: MatTableDataSource<any>;

    public inputData: Array<any>;
    public inputDataObservable: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

    constructor(@Optional() private emitter: MatTableEmitter,
        private changeRef: ChangeDetectorRef, private appRef: ApplicationRef,
        private currencyPipe: CurrencyPipe, private decimalPipe: DecimalPipe,
        private datePipe: DatePipe, private percentPipe: PercentPipe) {
    }

    isSorting(name: string) {
        return this.options.config.sortBy !== name && name !== '';
    };

    isSortAsc(name: string): boolean {
        var isSortAsc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'asc';
        return isSortAsc;
    };

    isSortDesc(name: string): boolean {
        var isSortDesc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'desc';
        return isSortDesc;
    };

    //sortData(sortEvent: Sort) {
    //  this.options.config.sortBy = sortEvent.active;
    //  this.options.config.sortDirection = sortEvent.direction === 'asc' ? 'desc' : 'asc';
    //  this.sortPageChange.emit();
    //}

    setCellValue(row: any, column: MatTableColumnDefinition, value: any, $event?: Event): any {
        var obj = column.binding.split('.').reduce((prev: any, curr: string) => prev[curr], row);
        console.log("Old value.. " + obj);

        // Presume that an exclusive checkbox requires a selection ... so, if it was true before,
        // don't let it get set to false now.
        if (obj === true) {
            if (column.isCheckbox && column.isExclusive) {
                if ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                }
                return false;
            }
        }

        var key = column.binding;
        if (row.hasOwnProperty(key)) {
            row[key] = value;
            obj = column.binding.split('.').reduce((prev: any, curr: string) => prev[curr], row);
            console.log("New value.. " + obj);
        }
        else {
            console.log("Row doesn't contain property..");
        }

        if (column.isCheckbox && column.isExclusive) {
            for (let r of this.inputData) {
                if (r !== row) {
                    r[key] = false;
                }
            }

            if (this.emitter) {
                this.emitter.next({ name: 'cellClicked', data: { row: row, column: column, value: value } });
            }
        }
    }

    getHyperLink(row: any, column: MatTableColumnDefinition): string {
        if (!row || column === null) {
            return '';
        }

        let result: string = '';
        let isComputed: boolean = column.hyperLink.indexOf('.') !== -1;
        if (isComputed) {
            let evalfunc = new Function('r', 'return ' + column.hyperLink);
            result = evalfunc(row);
        } else {
            result = column.hyperLink.split('.').reduce((prev: any, curr: string) => prev[curr], row);
        }

        return result;
    }

    getQueryParams(row: any, column: MatTableColumnDefinition): any {
        let evalfunc = new Function('r', `return ${column.queryParams}`);
        let queryParams: any = evalfunc(row) ?? '';
        return queryParams;
    }

    getRouterLink(row: any, column: MatTableColumnDefinition): string | Array<any> {
        let conditionalIndex: number = column.routerLink.indexOf("?");
        let linkSource: string = column.routerLink;
        if (conditionalIndex > -1) {
            let evalConditionFunc = new Function('r', `return ${linkSource}`);
            linkSource = evalConditionFunc(row);
        }

        let evalfunc = new Function('r', `return ${linkSource}`);
        let routerLink: Array<any> = evalfunc(row);
        return routerLink;

        // If object(s) are specified in the routerLink text, evalute as an array
        if (linkSource.indexOf("{") > -1 && linkSource.indexOf("}") > -1) {
            // If we wanted to manually parse out, we can ..
            // let objJson: string = linkSource.substring(linkSource.lastIndexOf("{"), linkSource.lastIndexOf("}") + 1);
            // let evalfunc = new Function('r', `return ${objJson}`);
            // let obj: any = evalfunc(row);
            // let objStr: string = Object.keys(obj).map((key: string) => `${key}=${obj[key]}`).join(';')
            // routerLink = `${linkSource.replace(`${objJson}`, '').replace(',', '').replace(/'/g, '').trim()};${objStr}`;

            // Let's simply evaluate as an array...
            let evalfunc = new Function('r', `return ${linkSource}`);
            let routerLink: Array<any> = evalfunc(row);
            return routerLink;
        } else {
            let routerLink = linkSource
                .replace('[', '').replace(']', '')
                .split(",")
                .map(x => x.trim().replace(/'/g, ''))
                .map(x => {
                    let result = x;
                    if (x.startsWith("r.")) {
                        let evalfunc = new Function('r', 'return ' + x);
                        let evalresult: string = evalfunc(row);
                        return evalresult;
                    }
                    return result;
                })
                .join('/');
            return routerLink;
        }
    }

    isValidAnchor(row: any, column: MatTableColumnDefinition): boolean {
        if (!column.isAnchor) { return false; }
        if (!column.isAnchorComputed) { return true; }

        let evalfunc = new Function('r', 'return ' + column.isAnchorComputed);
        return evalfunc(row);
    }

    getCellValueByIndex(index: number, column: MatTableColumnDefinition): string {
        let row = this.inputData[index];
        return this.getCellValue(row, column);
    }

    getCellValue(row: any, column: MatTableColumnDefinition): string {
        if (!row || column === null) {
            return '';
        }

        var result: string = '';

        try {

            if (column.isComputed) {
                let evalfunc = new Function('r', 'return ' + column.binding);
                result = evalfunc(row);
            } else {
                result = column.binding.split('.').reduce((prev: any, curr: string) => prev[curr], row);
            }

            if (column.filter) {
                if (column.filter === "currency") {
                    result = this.currencyPipe.transform(result);
                }

                if (column.filter.indexOf("date=") !== -1 && !isNaN(new Date(result).getDate())) {
                    var filter = column.filter.replace("date=", "");
                    result = this.datePipe.transform(result, filter);
                }
            }
        } catch (error) {
            console.error(error);
        }

        return result;
    }

    edit(item: any) {
        this.options.callbacks.edit(item);
    }

    toggle(item: any) {
        this.options.callbacks.toggle(item);
    }

    delete(item: any) {
        this.options.callbacks.delete(item);
    }

    display(item: any) {
        this.options.callbacks.display(item);
    }

    custom(item: any, $event?: Event) {
        $event?.preventDefault();
        $event?.stopPropagation();
        this.options.callbacks.customAction(item);
    }

    customActionDisabled(item: any) {
        return this.options.callbacks.customActionDisabled ? this.options.callbacks.customActionDisabled(item) : false;
    }

    // Methods for material selection
    /** Whether every enabled row is selected. */
    isAllSelected() {
        return this.dataSource.data
            .filter(d => d.disableCheckbox !== true)
            .every(r => this.options.selection.isSelected(r));
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        let selected: Array<any> = this.options.selection.selected;
        this.isAllSelected() ?
            this.options.selection.clear() :
            this.dataSource.data.filter(d => d.disableCheckbox !== true).forEach(row => this.options.selection.select(row));
        this.selectionChange.emit({
                source: this.options.selection,
                added: this.options.selection.selected,
                removed: selected
            });
    }

    /** Toggles the selection of a single element */
    toggleSelection(element: any) {
        let isSelected: boolean = this.options.selection.isSelected(element);
        this.options.selection.toggle(element);
        let removed = isSelected ? [element] : [];
        let added = isSelected ? [] : [element];
        this.selectionChange.emit({ source: this.options.selection, added: added, removed: removed });
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.options.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.inputData.indexOf(row) + 1}`;
    }

    /** Checks if the checkbox on passed row should be disabled */
    checkDisabledStatus(row?: any): boolean {
        if (row && row.disableCheckbox) {
            return true;
        }
        return false;
    }

    /** The tooltip to be shown for the checkbox on the passed row */
    getCheckboxTooltip(row?: any): string {
        if (row && row.checkboxTooltip && row.checkboxTooltip.length > 0) {
            return row.checkboxTooltip;
        }
        return "";
    }

    ngAfterViewInit() {
        if (this.options.config.showPagination || this.options.config.showSort && (!this.options.config.clientSortPage)) {

            // After sort, specify page zero
            this.matSort.sortChange.subscribe(() => { this.paginator.pageIndex = 0; this.options.config.pageNumber = 1; });

            // After a sort or page, callback the executesearch
            merge(this.matSort.sortChange, this.paginator.page)
                .pipe(
                    tap(() => {
                        this.options.config.sortBy = this.matSort.active;
                        this.options.config.sortDirection = this.matSort.direction;
                        this.options.config.pageSize = this.paginator.pageSize;
                        this.options.config.pageNumber = this.paginator.pageIndex + 1;

                        this.sortPageChange.emit();

                        // We could also use a call-back, but we'll use an event for now
                        // since it seems more reliable and there is less to pass around
                        //(this.options.callbacks.executeSearch() as Observable<any>)
                        //  .subscribe(() => {
                        //    this.paginator.pageSize = this.options.config.pageSize;
                        //    this.paginator.pageIndex = this.options.config.pageNumber;
                        //    this.paginator.length = this.options.config.totalCount;
                        //  });
                    })
                )
                .subscribe();
        }
    }

    ngOnInit() {
        // Material ..
        this.dataSource = new MatTableDataSource<any>([]);

        this.canSelect = this.options.config.showSelectAll || this.options.config.showSelectCheckbox;
        this.canEdit = this.options.config.showEdit;
        this.canToggle = this.options.config.showToggle;
        this.canDelete = this.options.config.showDelete;
        this.canDisplay = this.options.config.showDisplay;
        this.customAction = this.options.config.showCustomAction;
        this.customActionType = this.options.customActionType;

        // Push select so it is first (on the left)
        if (this.canSelect) {
            this.primaryDisplayedColumns.push("select");
        }

        // Push the rest of the columns
        this.options.columns.map(column => this.primaryDisplayedColumns.push(column.value));

        // Push edit so it's last (on the right)
        if (this.canEdit) {
            this.primaryDisplayedColumns.push("edit");
        }

        // Push toggle so it's last (on the right)
        if (this.canToggle) {
            this.primaryDisplayedColumns.push("toggle");
        }

        // Push delete so it's last (on the right)
        if (this.canDelete) {
            this.primaryDisplayedColumns.push("delete");
        }

        if (this.canDisplay) {
            this.primaryDisplayedColumns.push("display");
        }

        // Push custom action so it's last (on the right)
        if (this.customAction) {
            this.primaryDisplayedColumns.push("customAction");
        }

        // Push the secondary columns
        this.options.secondaryColumns?.map(column => this.secondaryDisplayedColumns.push(column.value));

        this.subscription = this.options.records.subscribe(res => {
            if (res) {
                // Default to not displaying items that were deleted
                this.inputData = res.filter(item => !item.hasOwnProperty("isDeleted") || !item.isDeleted);

                // Material ..
                this.dataSource = new MatTableDataSource<any>(this.inputData);

                if (this.options.config.showSort) {
                    this.matSort.active = this.options.config.sortBy;
                    this.matSort.direction = this.options.config.sortDirection === 'asc' ? 'asc' : 'desc';
                    if (this.options.config.clientSortPage) {
                        this.dataSource.sort = this.matSort;
                    }
                }

                // Set pagination - note that if client side sort/paging is used, then
                // don't assign the paginator to the datasource
                if (this.options.config.showPagination) {
                    this.paginator.pageSize = this.options.config.pageSize;
                    this.paginator.pageIndex = this.options.config.pageNumber - 1;
                    if (this.options.config.clientSortPage) {
                        this.dataSource.paginator = this.paginator;
                    } else {
                        this.paginator.length = this.options.config.totalCount;
                    }
                }
                this.options.selection = new SelectionModel<any>(true, []);

                this.changeRef.markForCheck();
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // memorrize the row selected, even after paged out of the current page.
    @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();
    public selectedDataIndex = -1;
    onRowClicked(row, dataIndex) {
        this.selectedDataIndex = dataIndex;
        this.rowClicked.emit(row);
    }
}
