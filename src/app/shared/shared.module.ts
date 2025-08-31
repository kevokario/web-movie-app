import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatStepperModule } from '@angular/material/stepper';
import {FlexLayoutModule} from "@angular/flex-layout";

// other shared imports
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import {CoreModule} from "../core/core.module";
import { MovieSliderComponent } from './components/movie-slider/movie-slider.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { NoRecordsFoundComponent } from './components/no-records-found/no-records-found.component';

const materialModules =  [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatTabsModule,
  MatCardModule,
  MatGridListModule,
  MatDividerModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatBadgeModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatListModule,
  MatTreeModule,
  MatStepperModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  CoreModule
];

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    MovieSliderComponent,
    MovieCardComponent,
    NoRecordsFoundComponent],
  imports: [
    CommonModule,
    ...materialModules,

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...materialModules,
    CommonModule,
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    MovieSliderComponent,
    MovieCardComponent,
    NoRecordsFoundComponent
  ]
})
export class SharedModule { }
