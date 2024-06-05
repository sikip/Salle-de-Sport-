import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule ici
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarmenuComponent } from './barmenu/barmenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecomComponent } from './recom/recom.component';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponentComponent } from './signin-component/signin-component.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { SignupComponent } from './signup/signup.component';
import { PassoblirComponent } from './passoblir/passoblir.component';
import { Hh2Component } from './hh2/hh2.component';
import { SlidrevComponent } from './slidrev/slidrev.component';
import { EventComponent } from './event/event.component';
import { IventidComponent } from './iventid/iventid.component';
import { Map2Component } from './map2/map2.component';
import { Bar2Component } from './bar2/bar2.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Bar3Component } from './bar3/bar3.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { ImgcautcheComponent } from './imgcautche/imgcautche.component';
import { AdminComponent } from './admin/admin.component';
import { UserinfComponent } from './userinf/userinf.component';
import { Admin2Component } from './admin2/admin2.component';
import { SallidComponent } from './sallid/sallid.component';
import { Salleid2Component } from './salleid2/salleid2.component';
import { NgChartsModule } from 'ng2-charts';
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
import { EventlComponent } from './eventl/eventl.component';
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


@NgModule({
  declarations: [
    AppComponent,
    BarmenuComponent,
    BarmComponent,
    CartComponent,
    HhComponent,
    SsComponent,
    DsComponent,
    TableComponent,
    Img2Component,
    SlidComponent,
    Img3Component,
    HomeComponent,
    RecomComponent,
    MapComponent,
    FooterComponent,
    SigninComponentComponent,
    UserInformationComponent,
    SignupComponent,
    PassoblirComponent,
    Hh2Component,
    SlidrevComponent,
    EventComponent,
    IventidComponent,
    Map2Component,
    Bar2Component,
    Bar3Component,
    CommentaireComponent,
    ImgcautcheComponent,
    AdminComponent,
    UserinfComponent,
    Admin2Component,
    SallidComponent,
    Salleid2Component,
    BaradComponent,
    SingupcautchComponent,
    UpdevComponent,
    CatchiComponent,
    CautchevenmentComponent,
    EvcaoutchComponent,
    IventComponent,
    EventnotComponent,
    FeedbackComponent,
    OffreComponent,
    OffreidComponent,
    UserclientComponent,
    FormComponent,
    Form2Component,
    Form3Component,
    VedeoComponent,
    BaradusComponent,
    EmploitComponent,
    ClasseComponent,
    InscorComponent,
    Empl2Component,
    EmploievComponent,
    EventlComponent,
    EnetelestComponent,
    NewevComponent,
    InesevComponent,
    UpdateuserComponent,
    FrendComponent,
    YseriddComponent,
    ChatusComponent,
    Chat2Component,
    IbmuserComponent,
    ChopuserComponent,
    PaymeeComponent,
    ProddectComponent,
    Pay2Component,
    PaydetchComponent,
    MonchopComponent,
    MaypaymentComponent,
    FacteurteComponent,
    PaymentComponentComponent,
    SuccesComponent,
    FailedComponent,
    Tform2Component,
    Tform3Component,
    Signup2Component,
    Tform4Component,
    Signin2Component,
    Succes2Component,
    QrcodeComponent,
    ConfermationbuttonComponent,
    Pageerreue1Component,
    CautchtachComponent,
    EventcautchComponent,
    AddphotoComponent,
    VedeocreatedComponent,
    BaracautchComponent,
    CautemplComponent,
    NewevcComponent,
    MytrainerComponent,
    Chop2Component,
    OurTeamComponent,
    HelpfaqComponent,
    RevComponent,
    CuntactusComponent,
    TransformationComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    NgChartsModule,
 
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
