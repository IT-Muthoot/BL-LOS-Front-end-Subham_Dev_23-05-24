import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RadConfiguration1Component } from './components/admin-configurations/rad/configuration-1/rad-configuration-browse/rad-configuration1.component';
import { RadConfigurationSubmitFormComponent } from './components/admin-configurations/rad/configuration-1/rad-configuration-submit-form/rad-configuration-submit-form.component';
import { RadConfiguration2Component } from './components/admin-configurations/rad/configuration-2/rad-configuration-browse/rad-configuration2-browse.component';
import { RadConfiguration2SubmitFormComponent } from './components/admin-configurations/rad/configuration-2/rad-configuration2-submit-form/rad-configuration2-submit-form.component'; 
import { DigitalKycListComponent } from './components/admin-configurations/web-configuration/digital-kyc-list/digital-kyc-list.component';
import { DigitalKycComponent } from './components/admin-configurations/web-configuration/digital-kyc/digital-kyc.component';
import { UserManagementBrowseComponent } from './components/admin-configurations/user-management/user-management-browse/user-management-browse.component';
import { UnderWritingPreferenceComponent } from './components/admin-configurations/web-configuration/under-writing-preference/under-writing-preference.component';
import { UnderWritingPrefenceFormComponent } from './components/admin-configurations/web-configuration/under-writing-prefence-form/under-writing-prefence-form.component';
import { UserManagementSubmitFormComponent } from './components/admin-configurations/user-management/user-management-submit-form/user-management-submit-form.component';
import { RoleManagementBrowseComponent } from './components/admin-configurations/role-management/role-management-browse/role-management-browse.component';
import { RoleManagementSubmitComponent } from './components/admin-configurations/role-management/role-management-submit/role-management-submit.component';
import { StagewiseDocumentChecklistComponent } from './components/admin-configurations/web-configuration/stagewise-document-checklist/stagewise-document-checklist.component';
import { StagewiseDocumentChecklistConfigurationComponent } from './components/admin-configurations/web-configuration/stagewise-document-checklist-configuration/stagewise-document-checklist-configuration.component';
import { IcsConfiguration1BrowseComponent } from './components/admin-configurations/internal-credit-scoring/configuration-1/ics-configuration1-browse/ics-configuration1-browse.component';
import { IcsConfiguration1SubmitComponent } from './components/admin-configurations/internal-credit-scoring/configuration-1/ics-configuration1-submit/ics-configuration1-submit.component';
import { IcsConfiguration2BrowseComponent } from './components/admin-configurations/internal-credit-scoring/configuration-2/ics-configuration2-browse/ics-configuration2-browse.component';
import { IcsConfiguration2SubmitComponent } from './components/admin-configurations/internal-credit-scoring/configuration-2/ics-configuration2-submit/ics-configuration2-submit.component';
import { CompanyBlacklistBrowseComponent } from './components/admin-configurations/company-blacklist/company-blacklist-browse/company-blacklist-browse.component';
import { CompanyBlacklistSubmitComponent } from './components/admin-configurations/company-blacklist/company-blacklist-submit/company-blacklist-submit.component';
import { WilfulDefaulterBlacklistBrowseComponent } from './components/admin-configurations/wilful-defaulter-blacklist/wilful-defaulter-blacklist-browse/wilful-defaulter-blacklist-browse.component';
import { WilfulDefaulterBlacklistSubmitComponent } from './components/admin-configurations/wilful-defaulter-blacklist/wilful-defaulter-blacklist-submit/wilful-defaulter-blacklist-submit.component';
import { SlaDefinationListComponent } from './components/admin-configurations/web-configuration/sla-defination-list/sla-defination-list.component';
import { SlaDefinationFormComponent } from './components/admin-configurations/web-configuration/sla-defination-form/sla-defination-form.component';
import { CreditCommitteeConfigurationBrowseComponent } from './components/admin-configurations/credit-committee-configuration/credit-committee-configuration-browse/credit-committee-configuration-browse.component';
import { CreditCommitteeConfigurationSubmitComponent } from './components/admin-configurations/credit-committee-configuration/credit-committee-configuration-submit/credit-committee-configuration-submit.component';
import { AgencyManagementBrowseComponent } from './components/admin-configurations/agency-agent-management/agency-management-browse/agency-management-browse.component';
import { AgencyManagementSubmitComponent } from './components/admin-configurations/agency-agent-management/agency-management-submit/agency-management-submit.component';
import { AgentManagementBrowseComponent } from './components/admin-configurations/agency-agent-management/agent-management-browse/agent-management-browse.component';
import { AgentManagementSubmitComponent } from './components/admin-configurations/agency-agent-management/agent-management-submit/agent-management-submit.component';
import { AgentCommisoiningBrowseComponent } from './components/admin-configurations/agency-agent-management/agent-commisoining-browse/agent-commisoining-browse.component';
import { AgentCommisoiningSubmitComponent } from './components/admin-configurations/agency-agent-management/agent-commisoining-submit/agent-commisoining-submit.component';
import { LoanEligibilityCheckListComponent } from './components/admin-configurations/web-configuration/loan-eligibility-check-list/loan-eligibility-check-list.component';
import { LoanEligibilityCheckFormComponent } from './components/admin-configurations/web-configuration/loan-eligibility-check-form/loan-eligibility-check-form.component';
import { BreListComponent } from './components/admin-configurations/web-configuration/bre-list/bre-list.component';
import { BreFormComponent } from './components/admin-configurations/web-configuration/bre-form/bre-form.component';
import { BusinessRuleFormComponent } from './components/admin-configurations/web-configuration/business-rule-form/business-rule-form.component';
import { BusinessRuleListComponent } from './components/admin-configurations/web-configuration/business-rule-list/business-rule-list.component';
import { LeadManagementDashboardComponent } from './components/admin-configurations/lead-management/lead-management-dashboard/lead-management-dashboard.component';
import { EmployeeUnitMappingComponent } from './components/admin-configurations/lead-management/employee-unit-mapping/employee-unit-mapping.component';
import { LeadUploadComponent } from './components/admin-configurations/lead-management/lead-upload/lead-upload.component';
import { LeadBrowseComponent } from './components/admin-configurations/lead-management/lead-browse/lead-browse.component';
import { LeadAllocationBrowseComponent } from './components/admin-configurations/lead-management/lead-allocation-browse/lead-allocation-browse.component';
import { WorkflowStepperComponent } from './components/loan-workflow/workflow-stepper/workflow-stepper.component';
import { BankConfigListComponent } from './components/admin-configurations/web-configuration/bank-config-list/bank-config-list.component';
import { BankConfigFormComponent } from './components/admin-configurations/web-configuration/bank-config-form/bank-config-form.component';
import { BranchConfigListComponent } from './components/admin-configurations/web-configuration/branch-config-list/branch-config-list.component';
import { BranchConfigFormComponent } from './components/admin-configurations/web-configuration/branch-config-form/branch-config-form.component';
import { HolidayConfigListComponent } from './components/admin-configurations/web-configuration/holiday-config-list/holiday-config-list.component';
import { HolidayConfigFormComponent } from './components/admin-configurations/web-configuration/holiday-config-form/holiday-config-form.component';
import { MiscellaneousConfigListComponent } from './components/admin-configurations/web-configuration/miscellaneous-config-list/miscellaneous-config-list.component';
import { MiscellaneousConfigFormComponent } from './components/admin-configurations/web-configuration/miscellaneous-config-form/miscellaneous-config-form.component';
import { DataEnrichmentComponent } from './components/loan-workflow/data-enrichment/data-enrichment.component';
import { RadViewFormComponent } from './components/admin-configurations/rad/configuration-1/rad-view-form/rad-view-form.component';
import { RadConfiguration2ViewComponent } from './components/admin-configurations/rad/configuration-2/rad-configuration-2-view/rad-configuration-2-view.component';
import { CreditCommitteeService } from './services/credit-committee/credit-committee.service';
import { CreditCommitteeViewComponent } from './components/admin-configurations/credit-committee-configuration/credit-committee-view/credit-committee-view.component';
import { IcsConfiguration1ViewComponent } from './components/admin-configurations/internal-credit-scoring/configuration-1/ics-configuration-1-view/ics-configuration-1-view.component';
import { SkipStagesBrowseComponent } from './components/admin-configurations/skip-stages/skip-stages-browse/skip-stages-browse.component';
import { SkipStagesViewComponent } from './components/admin-configurations/skip-stages/skip-stages-view/skip-stages-view.component';
import { SkipStagesAddComponent } from './components/admin-configurations/skip-stages/skip-stages-add/skip-stages-add.component';
import { CommonPollBucketComponent } from './components/case-assignment-for-all/common-poll-bucket/common-poll-bucket.component';
import { IcsConfiguration2ViewComponent } from './components/admin-configurations/internal-credit-scoring/configuration-2/ics-configuration2-view/ics-configuration2-view.component';
import { SetPasswordComponent } from './components/auth/set-password/set-password.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SecurityQuestingComponent } from './components/auth/security-questing/security-questing.component';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';

export const routes: Routes = [{
    path:'', redirectTo:'login', pathMatch:'full'},
    { path:'login', component:LoginComponent},
    { path:'set-password', component:SetPasswordComponent},
    { path:'security-question-set', component:SecurityQuestingComponent},
    { path:'forgot-password', component:ForgotPasswordComponent},
    { path:'dashboard', component: DashboardComponent },

    // RAD
    { path:'rad-configuration-1-list', component: RadConfiguration1Component },
    { path:'rad-configuration-1-list/rad-configuration-1-submit-form', component: RadConfigurationSubmitFormComponent },
    { path:'rad-configuration-1-list/rad-configuration-1-view-details/:id', component: RadViewFormComponent },
    { path:'rad-configuration-2-list', component: RadConfiguration2Component },
    { path:'rad-configuration-2-list/rad-configuration-2-submit-form', component: RadConfiguration2SubmitFormComponent },
    { path:'rad-configuration-2-list/rad-configuration-2-view-details/:id', component: RadConfiguration2ViewComponent },

    { path:'digital-kyc-list', component: DigitalKycListComponent },
    { path:'digital-kyc-list/form', component: DigitalKycComponent },
    { path:'digital-kyc-list/form/edit/:id', component: DigitalKycComponent },

    // UnderWriting 
    { path:'underWriting-Preference', component: UnderWritingPreferenceComponent },
    { path:'underWriting-Preference/underWriting-Preference-form', component: UnderWritingPrefenceFormComponent },
    { path:'underWriting-Preference/underWriting-Preference-form/edit/:id', component: UnderWritingPrefenceFormComponent },

    { path:'user-management-list', component: UserManagementBrowseComponent },
    { path:'user-management-list/user-management-submit', component: UserManagementSubmitFormComponent },
    { path:'user-management-list/user-management-submit/edit/:id', component: UserManagementSubmitFormComponent },
    { path:'role-management-list', component: RoleManagementBrowseComponent },
    { path:'role-management-list/role-management-submit', component: RoleManagementSubmitComponent },
    { path:'role-management-list/edit/:id', component: RoleManagementSubmitComponent},
    { path:'stagewise-documents-checklist', component: StagewiseDocumentChecklistComponent },
    { path:'stagewise-documents-checklist-form', component: StagewiseDocumentChecklistConfigurationComponent },

    // Internal Credit Scoring

    { path:'ics-configurtion-1-browse', component: IcsConfiguration1BrowseComponent},
    { path:'ics-configurtion-1-browse/ics-configuration1-submit', component: IcsConfiguration1SubmitComponent },
    { path:'ics-configurtion-1-browse/ics-configuration1-view/:id', component:IcsConfiguration1ViewComponent },
    { path:'ics-configuration-2-browse', component:IcsConfiguration2BrowseComponent },
    { path:'ics-configuration-2-browse/ics-configuration2-submit', component:IcsConfiguration2SubmitComponent },
    { path:'ics-configuration-2-browse/ics-configuration2-view/:id', component: IcsConfiguration2ViewComponent},
    


    { path:'company-blacklist', component: CompanyBlacklistBrowseComponent},
    { path:'company-blacklist/company-blacklist-submit', component: CompanyBlacklistSubmitComponent},
    { path:'wilful-defaulter-blacklist-browse', component: WilfulDefaulterBlacklistBrowseComponent},
    { path:'wilful-defaulter-blacklist-browse/wilful-defaulter-blacklist-submit', component: WilfulDefaulterBlacklistSubmitComponent},
    { path:'wilful-defaulter-blacklist-browse/edit/:id', component: WilfulDefaulterBlacklistSubmitComponent},


    { path:'sla-defination-list', component: SlaDefinationListComponent},
    { path:'sla-defination-list/sla-defination-form', component: SlaDefinationFormComponent},
    { path:'sla-defination-list/sla-defination-form/edit/:id', component: SlaDefinationFormComponent},

    // Credit committee 

    { path:'credit-committee-configuration-browse', component: CreditCommitteeConfigurationBrowseComponent},
    { path:'credit-committee-configuration-browse/credit-committee-configuration-submit', component: CreditCommitteeConfigurationSubmitComponent},
    { path:'credit-committee-configuration-browse/credit-committee-view-details/:id', component: CreditCommitteeViewComponent},

    // Skip Stage

    { path:'skip-stage-configuration-browse', component: SkipStagesBrowseComponent},
    { path:'skip-stage-configuration-browse/skip-stage-configuration-add', component: SkipStagesAddComponent},
    { path:'skip-stage-configuration-browse/skip-stage-configuration-add/:id', component: SkipStagesViewComponent},

    // Agency agent manaement

    { path:'agency-management-browse', component: AgencyManagementBrowseComponent},
    { path:'agency-management-browse/agency-management-submit', component: AgencyManagementSubmitComponent},
    { path:'agency-management-browse/agency-management-submit/edit/:id', component: AgencyManagementSubmitComponent},
    { path:"agent-management-browse", component:AgentManagementBrowseComponent },
    { path:"agent-management-browse/agent-management-submit", component: AgentManagementSubmitComponent},
    { path:"agent-management-browse/agent-management-submit/edit/:id", component: AgentManagementSubmitComponent},
    { path:"agent-commision-management-browse", component: AgentCommisoiningBrowseComponent},
    { path:"agent-commision-management-browse/agent-commision-management-submit", component:AgentCommisoiningSubmitComponent },
    { path:"agent-commision-management-browse/agent-commision-management-submit/edit/:id", component:AgentCommisoiningSubmitComponent },

    {path:"loan-eligibility-check-list",component:LoanEligibilityCheckListComponent},
    {path:"loan-eligibility-check-list/loan-eligibility-check-list-form",component:LoanEligibilityCheckFormComponent},
    {path:"bre-list",component:BreListComponent},
    {path:"bre-form",component:BreFormComponent},
    {path:"business-risk-list",component:BusinessRuleListComponent},
    {path:"business-risk-form",component:BusinessRuleFormComponent},
    // Lead Management

    { path:"lead-management-dashboard", component: LeadManagementDashboardComponent},
    { path:"employee-unit-mapping", component: EmployeeUnitMappingComponent},
    { path:"employee-unit-mapping/lead-upload", component: LeadUploadComponent},
    { path:"lead-browse", component: LeadBrowseComponent},
    { path:"lead-allocation-browse", component: LeadAllocationBrowseComponent},

    // Loan Flow
    { path:"loan-workflow", component:WorkflowStepperComponent},
    { path:"data-enrichment", component:DataEnrichmentComponent},


    { path:"bank-config-list", component:BankConfigListComponent},
    { path:"bank-config-form", component:BankConfigFormComponent},
    { path:"branch-config-list", component:BranchConfigListComponent},
    { path:"branch-config-list/branch-config-form", component:BranchConfigFormComponent},
    { path:"holiday-config-list", component:HolidayConfigListComponent},
    { path:"holiday-config-form", component:HolidayConfigFormComponent},
    { path:"miscellaneous-config-list", component:MiscellaneousConfigListComponent},
    { path:"miscellaneous-config-form", component:MiscellaneousConfigFormComponent},


    //common-pool
    { path:"case-assignment", component:CommonPollBucketComponent},
    { path:'loan-calculator', component: LoanCalculatorComponent },

];
