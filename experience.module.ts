import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExperiencesComponent } from './experiences/experiences.component';

const routes: Routes = [{ path: '', component: ExperiencesComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, ExperiencesComponent, RouterModule.forChild(routes)],
})
export class ExperienceModule {}
