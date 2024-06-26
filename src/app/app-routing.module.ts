import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarmenuComponent } from './barmenu/barmenu.component';
import { BarmComponent } from './barm/barm.component';
import { CartComponent } from './cart/cart.component';
import { HhComponent } from './hh/hh.component';
import { SsComponent } from './ss/ss.component';
import { DsComponent } from './ds/ds.component';
import { TableComponent } from './table/table.component';
import { Img2Component } from './img2/img2.component';
import { SlidComponent } from './slid/slid.component';
import { Img3Component } from './img3/img3.component';
import { HomeComponent } from './home/home.component';
import { SigninComponentComponent } from './signin-component/signin-component.component';
import { RecomComponent } from './recom/recom.component';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { SignupComponent } from './signup/signup.component';
import { PassoblirComponent } from './passoblir/passoblir.component';
import { Hh2Component } from './hh2/hh2.component';
import { EventComponent } from './event/event.component';
import { IventidComponent } from './iventid/iventid.component';
import { Map2Component } from './map2/map2.component';
import { Bar2Component } from './bar2/bar2.component';
import { Bar3Component } from './bar3/bar3.component';
import { commentaire } from './commentaire';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { ImgcautcheComponent } from './imgcautche/imgcautche.component';
import { AdminComponent } from './admin/admin.component';
import { UserinfComponent } from './userinf/userinf.component';
import { SlidrevComponent } from './slidrev/slidrev.component';
import { Admin2Component } from './admin2/admin2.component';
import { SallidComponent } from './sallid/sallid.component';
import { Salleid2Component } from './salleid2/salleid2.component';
import { BaradComponent } from './barad/barad.component';
import { SingupcautchComponent } from './singupcautch/singupcautch.component';
import { UpdevComponent } from './updev/updev.component';
import { CatchiComponent } from './catchi/catchi.component';
import { CautchevenmentComponent } from './cautchevenment/cautchevenment.component';
import { EvcaoutchComponent } from './evcaoutch/evcaoutch.component';
import { IventComponent } from './ivent/ivent.component';
import { EventnotComponent } from './eventnot/eventnot.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { OffreComponent } from './offre/offre.component';
import { OffreidComponent } from './offreid/offreid.component';
import { UserclientComponent } from './userclient/userclient.component';
import { FormComponent } from './form/form.component';
import { Form2Component } from './form2/form2.component';
import { Form3Component } from './form3/form3.component';
import { VedeoComponent } from './vedeo/vedeo.component';
import { BaradusComponent } from './baradus/baradus.component';
import { EmploitComponent } from './emploit/emploit.component';
import { ClasseComponent } from './classe/classe.component';
import { InscorComponent } from './inscor/inscor.component';
import { Empl2Component } from './empl2/empl2.component';
import { EmploievComponent } from './emploiev/emploiev.component';
import { EnetelestComponent } from './enetelest/enetelest.component';
import { NewevComponent } from './newev/newev.component';
import { InesevComponent } from './inesev/inesev.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { FrendComponent } from './frend/frend.component';
import { YseriddComponent } from './yseridd/yseridd.component';
import { ChatusComponent } from './chatus/chatus.component';
import { Chat2Component } from './chat2/chat2.component';
import { IbmuserComponent } from './ibmuser/ibmuser.component';
import { ChopuserComponent } from './chopuser/chopuser.component';
import { PaymeeComponent } from './paymee/paymee.component';
import { ProddectComponent } from './proddect/proddect.component';
import { Pay2Component } from './pay2/pay2.component';
import { PaydetchComponent } from './paydetch/paydetch.component';
import { MonchopComponent } from './monchop/monchop.component';
import { MaypaymentComponent } from './maypayment/maypayment.component';
import { FacteurteComponent } from './facteurte/facteurte.component';
import { PaymentComponentComponent } from './payment-component/payment-component.component';
import { SuccesComponent } from './succes/succes.component';
import { FailedComponent } from './failed/failed.component';
import { Tform2Component } from './tform2/tform2.component';
import { Tform3Component } from './tform3/tform3.component';
import { Signup2Component } from './signup2/signup2.component';
import { Tform4Component } from './tform4/tform4.component';
import { Signin2Component } from './signin2/signin2.component';
import { Succes2Component } from './succes2/succes2.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { ConfermationbuttonComponent } from './confermationbutton/confermationbutton.component';
import { Pageerreue1Component } from './pageerreue1/pageerreue1.component';
import { CautchtachComponent } from './cautchtach/cautchtach.component';
import { EventcautchComponent } from './eventcautch/eventcautch.component';
import { AddphotoComponent } from './addphoto/addphoto.component';
import { VedeocreatedComponent } from './vedeocreated/vedeocreated.component'; 
import { BaracautchComponent } from './baracautch/baracautch.component';
import { CautemplComponent } from './cautempl/cautempl.component';
import { NewevcComponent } from './newevc/newevc.component';
import { MytrainerComponent } from './mytrainer/mytrainer.component';
import { Chop2Component } from './chop2/chop2.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { HelpfaqComponent } from './helpfaq/helpfaq.component';
import { RevComponent } from './rev/rev.component';
import { CuntactusComponent } from './cuntactus/cuntactus.component';
import { TransformationComponent } from './transformation/transformation.component';
const routes: Routes = [
  { path: 'bar', component: BarmenuComponent },
  { path: 'b1', component: BarmComponent },
  { path: 'cart', component: CartComponent },
  { path: 'h', component: HhComponent },
  { path: 's', component: SsComponent },
  { path: 'ds', component: DsComponent },
  { path: 't', component: TableComponent },
  { path: 'im', component: Img2Component },
  { path: 'sl', component: SlidComponent },
  { path: 'img', component: Img3Component },
  { path: 'hom', component: HomeComponent },
  { path: 'rec', component: RecomComponent },
  { path: 'map', component: MapComponent },
  { path: 'foot', component: FooterComponent },
  { path: 'sigin', component: SigninComponentComponent },
  { path: 'user-information/:userId', component: UserInformationComponent },
  { path: 'sigup', component: SignupComponent },
  { path: 'passoblier', component: PassoblirComponent },
  { path: 'hh2', component: Hh2Component },
  { path: 'event', component: EventComponent },
  { path: 'eventid/:id', component: IventidComponent },
  { path: 'map2', component: Map2Component },
  { path: 'bar2', component: Bar2Component },
  { path: 'bar3', component: Bar3Component },
  { path: 'com', component: CommentaireComponent },
  { path: 'ImgcautcheComponent', component: ImgcautcheComponent },
  { path: 'admin/:id', component: AdminComponent },
  { path: 'user/:userId', component: UserinfComponent },
  { path: 'Slidrev/:id', component: SlidrevComponent },
  { path: 'ad2', component: Admin2Component },
  { path: 'sall/:id', component: SallidComponent },
  { path: 'sall2/:id', component: Salleid2Component },
  { path: 'BaradComponent', component: BaradComponent },
  { path: '', redirectTo: "/bar", pathMatch: 'full' },
  { path: 'SingupcautchComponent/:id', component: SingupcautchComponent },
  { path: 'updev/:eventId', component: UpdevComponent },
  { path: 'cautch/:id', component: CatchiComponent },
  { path: 'CautchevenmentComponent/:id', component: CautchevenmentComponent },
  { path: 'evcaoutch/:id', component: EvcaoutchComponent },
  { path: 'Ivent/:id', component: IventComponent },
  { path: 'Iventnot/:id', component: EventnotComponent },
  { path: 'feedback/:id', component: FeedbackComponent },
  { path: 'offre/:id', component: OffreComponent },
  { path: 'offreid/:id', component: OffreidComponent },
  { path: 'userclient/:id', component: UserclientComponent },
  { path: 'form', component: FormComponent },
  { path: 'form2', component: Form2Component },
  { path: 'form3', component: Form3Component },
  { path: 'vedeo/:userId/:id', component: VedeoComponent },
  { path: 'barus', component: BaradusComponent },
  { path: 'emploit/:userId', component: EmploitComponent },
  { path: 'inscription/:userId/:classeId', component: ClasseComponent },
  { path: 'inscriptioncour/:userId/:classeId', component: InscorComponent },
  { path: 'emploit2/:userId', component: Empl2Component },
  { path: 'emploitev/:userId', component: EmploievComponent },
  { path: 'initlest/:userId/:id', component: EnetelestComponent },
  { path: 'newev/:userId', component: NewevComponent },
  { path: 'inseven/:userId/:id', component: InesevComponent },
  { path: 'updateuser/:userId', component: UpdateuserComponent },
  { path: 'frend/:userId', component: FrendComponent },
  { path: 'useridd/:userId/:id', component: YseriddComponent },
  { path: 'chat/:userId/:id', component: ChatusComponent },
  { path: 'chat2/:userId/:id', component: Chat2Component },
  { path: 'ibm/:userId', component: IbmuserComponent },
  { path: 'chop/:userId', component: ChopuserComponent },
  { path: 'paymee', component: PaymeeComponent },
  { path: 'chopdetait/:userId/:id', component: ProddectComponent },
  { path: 'pay2/:userId/:id', component: Pay2Component },
  { path: 'chopdetait2/:userId/:id', component: PaydetchComponent },
  { path: 'monchop/:userId', component: MonchopComponent },
  { path: 'monpay/:userId', component: MaypaymentComponent },
  { path: 'facteure/:userId/:id', component: FacteurteComponent },
  { path: 'PaymentComponentComponent/:userId', component: PaymentComponentComponent },
  { path: 'succes/:userId', component: SuccesComponent },
  { path: 'failed/:userId', component: FailedComponent },
  { path: 'tform/:id', component: Tform2Component },
  { path: 'tform3/:id', component: Tform3Component },
  { path: 'signup/:id', component: Signup2Component },
  { path: 'tform4/:id', component: Tform4Component },
  { path: 'signin/:id', component: Signin2Component },
  { path: 'payment2/:userId/:id', component: Succes2Component },
  { path: 'qrcode/:userId', component: QrcodeComponent },
  { path: 'confirm-registration/:email', component: ConfermationbuttonComponent },
  { path: 'erreure1', component: Pageerreue1Component },
  { path: 'cautchtach/:userId', component: CautchtachComponent },
  { path: 'eventcautch/:userId', component: EventcautchComponent },
  { path: 'addphoto/:userId/:id', component: AddphotoComponent },
  { path: 'vedeocreated/:userId/:id', component: VedeocreatedComponent },
  { path: 'barus2', component: BaracautchComponent },
  { path: 'cautchemploid/:userId', component: CautemplComponent },
  { path: 'newevc/:userId', component: NewevcComponent },
  { path: 'myTrainer/:userId', component: MytrainerComponent },
  { path: 'Chop2/:userId', component: Chop2Component },
  { path: 'ourTeam', component: OurTeamComponent },
  { path: 'help', component: HelpfaqComponent },
  { path: 'rev', component: RevComponent },
  { path: 'contact', component: CuntactusComponent },
  { path: 'Transformation', component: TransformationComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})
export class AppRoutingModule { }
