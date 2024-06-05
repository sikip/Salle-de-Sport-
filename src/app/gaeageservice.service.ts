import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { offre } from './offre'
import { salle } from './salle';
import { JwtResponse } from './JwtResponse ';
import { LoginRequest } from './LoginRequest ';
import { User } from './user';
import { SignupRequest } from './SignupRequest';
import { MessageResponse } from './MessageResponse ';
import { eventtes } from './eventtes';
import { commentaire } from './commentaire';
import { classes } from './classes';
import { clientaccept } from './clientaccept';
import { publication } from './publication';
import { message } from './message';
import { chop } from './chop';
import { choprevieux } from './choprevieux';
import { PaymentRequest } from './PaymentRequest ';
import { Vedeo } from './Vedeo';
import { reieuxclasses } from './revieuxclasse';
import { ClientExperienc } from './ClientExperienc';
@Injectable({
  providedIn: 'root'
})
export class GaeageserviceService {

  private baseUrl = 'http://localhost:8080';
  private apiUrl = this.baseUrl;
  private jwtTokenKey = 'bezKoderSecretKey'
  private appToken = '485acc37-649e-43b4-9663-3e2ea7dce6e9'; // Remplacez par votre jeton d'application
  private appSecret = '29e96e53-c807-462e-b48e-3f58ca6ace46'; // Remplacez par votre secret d'application
  
  constructor(private http: HttpClient) { }
  getNumberClients(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/client-count`);
  }
  getNumbecautche(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/cautche-count`);
  }
  getNumberEvent(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/event-count`);
  }

  getAllOffre(): Observable<offre[]> {
    return this.http.get<offre[]>(`${this.baseUrl}/getAllOffre`);
  }
  getsall(): Observable<salle[]> {
    return this.http.get<salle[]>(`${this.baseUrl}/getsall`);
  }
  playVideo(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/play/${id}`, { responseType: 'blob' });
  }

  connect(loginRequest: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/signin`, loginRequest); // Correction ici
  }
  saveToken(token: string): void {
    localStorage.setItem(this.jwtTokenKey, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.jwtTokenKey);
  }
  saveuser(User: User, accessToken: string) {
    localStorage.setItem("user", JSON.stringify(User));
    localStorage.setItem("jwt", accessToken)
  }
  removeToken(): void {
    localStorage.removeItem(this.jwtTokenKey);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }
  registerUser(signupRequest: SignupRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.baseUrl}/signup`, signupRequest);
  }
  resetPassword(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/reset-password`, {}, { params, responseType: 'text' });
  }
  getuser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getuser`);
  }
  getevent(): Observable<eventtes[]> {
    return this.http.get<eventtes[]>(`${this.baseUrl}/getevent`);
  }
  getVoitureDetails(id: number): Observable<eventtes> {
    return this.http.get<eventtes>(`${this.baseUrl}/findByidEvente/${id}`);
  }
  commantairecount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/commantaire-count`);
  }
  playVideo2(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/play/${id}`, { responseType: 'blob' });
  }
  playVideoByEventId(eventId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/playVideoByEventId/${eventId}`, { responseType: 'blob' });
  }
  getEventsWithPrevieosDeja(): Observable<eventtes[]> {
    return this.http.get<eventtes[]>(`${this.baseUrl}/passed`);
  }

  getcommentaire(): Observable<commentaire[]> {
    return this.http.get<commentaire[]>(`${this.baseUrl}/getcommentaire`);
  }
  addComment(eventId: number, commentaire: commentaire): Observable<commentaire> {
    return this.http.post<commentaire>(`${this.baseUrl}/${eventId}/comments`, commentaire);
  }
  getCautchDetails(eventId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${eventId}/cautch-details`);
  }
  updateUserImage(userId: number, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageFile', imageFile, imageFile.name);
    return this.http.post(`${this.baseUrl}/admin/${userId}`, formData);
  }
  addSalle(salleData: FormData): Observable<any> {
    const url = `${this.baseUrl}/addsalle`;
    return this.http.post(url, salleData);
  }
  getSalleById(id: number): Observable<salle> {
    return this.http.get<salle>(`${this.baseUrl}/s1/${id}`);
  }
  ajouterImagesALaSalle(salleId: number, image1: File, image2: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image1', image1, image1.name);
    formData.append('image2', image2, image2.name);

    return this.http.post<any>(`${this.baseUrl}/${salleId}/images`, formData);
  }
  updateSalle(id: number, salle: salle): Observable<salle> {
    const url = `${this.apiUrl}/sall/${id}`;
    return this.http.post<salle>(url, salle);
  }
  countUsersByMonth(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/countByMonth`);
  }
  getAllClasses(): Observable<classes[]> {
    return this.http.get<classes[]>(`${this.baseUrl}/classes`);
  }
  API = "http://localhost:8080";
  public updatesalle2(salle: salle) {
    return this.http.put(this.API + '/updatesalle', salle);
  }
  getUsersWithRoleCoach(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/cautch`);
  }
  updateAcceptationById(eventId: number, acceptation: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/eventtes/${eventId}`, acceptation);
  }
  getCountTotalEventsByUser(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/eventsacepted/${userId}`);
  }
  calculateUserEarnings(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/calculate/${userId}`);
  }
  calculateUserEarningsmois(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/eventsMoi/${userId}`);
  }
  eventsper(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/eventsper/${userId}`);
  }
  calculateAcceptedRevenueForUserInCurrentMonth(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/eventsaceptedsalaire/${userId}`);
  }
  getRevenueChange(userId: number): Observable<string> {
    return this.http.get<string>(`http://localhost:8080/eventsindice/${userId}`);
  }
  countEventByMonth(userId: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/eventmois/${userId}`);
  }
  calculcaount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${userId}`);
  }

  updateSalle2(salleId: number, numero: string, time: string, email: string, localaisation: string,
    locationexact: string, latitude: number, longitude: number, slogon1: string,
    slogon2: string,prix:number ,name: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('numero', numero);
    formData.append('prix', String(prix));
    formData.append('time', time);
    formData.append('email', email);
    formData.append('localaisation', localaisation);
    formData.append('locationexact', locationexact);
    formData.append('latitude', String(latitude));
    formData.append('longitude', String(longitude));
    formData.append('slogon1', slogon1);
    formData.append('slogon2', slogon2);
    formData.append('name', name);

    return this.http.post<any>(`${this.baseUrl}/sall/${salleId}`, formData);
  }
  countAcceptedClientsByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/acceptedclient/${userId}`);
  }
  getAcceptedEventsByUserId(userId: number): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.baseUrl}/nomeventaccept/${userId}`);
  }
  getAllEventsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/userevents/${userId}`);
  }
  getTopThreeEventsByUserId(userId: number): Observable<eventtes[]> {
    return this.http.get<eventtes[]>(`${this.baseUrl}/topevent/${userId}`);
  }
  getClientAcceptsByUserId(userId: number): Observable<clientaccept[]> {
    return this.http.get<clientaccept[]>(`${this.baseUrl}/useracept/${userId}`);
  }
  activeTab: string = '';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getActiveTab(): string {
    return this.activeTab;
  }
  getNumberEventacept(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalaccepted`);
  }
  getNumberEventfalse(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/eventfalse`);
  }
  geteventall(): Observable<eventtes[]> {
    return this.http.get<eventtes[]>(`${this.baseUrl}/getall`);
  }
  getnotevent(): Observable<eventtes[]> {
    return this.http.get<eventtes[]>(`${this.baseUrl}/false`);
  }
  getCommentairesByEventId(id: number): Observable<commentaire[]> {
    return this.http.get<commentaire[]>(`${this.baseUrl}/commentaires/${id}`);
  }
  getAllCommentsWithEventNames(): Observable<commentaire[]> {
    return this.http.get<commentaire[]>(`${this.baseUrl}/withEventName`);
  }
  addOffre(offre: offre): Observable<offre> {
    return this.http.post<offre>(`${this.baseUrl}/add`, offre);
  }
  updateOffre(offreId: number, nom: string, prix: number, classe: string, month: string, message: number, entrepr: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nom', nom);
    formData.append('classe', classe);
    formData.append('month', month);
    formData.append('prix', String(prix));
    formData.append('entrepr', String(entrepr));
    formData.append('message', String(message));
    return this.http.post<any>(`${this.baseUrl}/update/${offreId}`, formData);
  }
  findUsersByRoleUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`);
  }
  getLastAcceptedEvent(): Observable<eventtes[]> {
    return this.http.get<eventtes[]>(`${this.baseUrl}/lastAccepted`);
  }
  uploadVideo(id: number, video: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('video', video, video.name);
    
    return this.http.post<any>(`${this.baseUrl}/post/${id}`, formData);
  }
  addpub(cautchId: number, pubData: FormData): Observable<any> {
    const url = `${this.baseUrl}/addpub/${cautchId}`;
    return this.http.post(url, pubData);
  }
  getAllPublicationsWithUserImages(): Observable<publication[]> {
    return this.http.get<publication[]>(`${this.baseUrl}/publication/details`);
  }
  inscrireUtilisateurAClasse(userId: number, classeId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/inscription/${userId}/${classeId}`, null, { responseType: 'text' as 'json' });
  }
  getClassesByUserId(userId: number): Observable<classes[]> {
    return this.http.get<classes[]>(`${this.baseUrl}/userclasse/${userId}`);
  }
  countClassesByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countclasse/${userId}`);
  
  }
  getUserAttributes(userId: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/attribut/${userId}`, { responseType: 'text' as 'json' });
  }
  getClasseById(id: number): Observable<classes> {
    return this.http.get<classes>(`${this.baseUrl}/classe/${id}`);
  }
  getCountUsersByClasseId(classeId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countuserclasse/${classeId}`);
  }
  playVideo3(classeId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/playVideoByClasseId/${classeId}`, { responseType: 'blob' });
  }
  getUsersByClasseId(classeId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/usersclasseassocier/${classeId}`);
  }
  getCountAcceptedEventsAfterCurrentDate(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/events/countAfterDate`);
  }
  countUsersByEventId(eventId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/eventsuser/${eventId}`);
  }
  getUsersByEventId(eventId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/eventuser2/${eventId}`);
  }
  getNumberOfEventsByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/userevv/${userId}`);
  }
  likeEvent(eventId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/like/${eventId}`, null);
  }
  likeEvent2(userId: number, eventId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/inscriptioniv/${userId}/${eventId}`, null, { responseType: 'text' as 'json' });
  }
 
  checkIfLiked(userId: number, eventId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/checkIfLiked/${userId}/${eventId}`);
  }
  getEventsWithLikesByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userlikeev/${userId}`);
  }
  inscrireUtilisateurAEvente(userId: number, eventId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/inscriptionevent/${userId}/${eventId}`, null, { responseType: 'text' as 'json' });
  }
  countLikesByEventId(eventId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/likesnumber/${eventId}`);
  }
  updateUser(userId: number,
    janfi?: number,
    fivri?: number,
    mars?: number,
    avrile?: number,
    mais?: number,
    juin?: number,
    juilliat?: number,
    aute?: number,
    septembre?: number,
    octobre?: number,
    decembre?: number,
    nauvembre?: number): Observable<any> {
const formData: FormData = new FormData();


if (janfi !== undefined) {
formData.append('janfi', String(janfi));
}
if (fivri !== undefined) {
formData.append('fivri', String(fivri));
}
if (mars !== undefined) {
formData.append('mars', String(mars));
}
if (avrile !== undefined) {
formData.append('avrile', String(avrile));
}
if (mais !== undefined) {
formData.append('mais', String(mais));
}
if (juin !== undefined) {
formData.append('juin', String(juin));
}
if (juilliat !== undefined) {
formData.append('juilliat', String(juilliat));
}
if (aute !== undefined) {
formData.append('aute', String(aute));
}
if (septembre !== undefined) {
formData.append('septembre', String(septembre));
}
if (octobre !== undefined) {
formData.append('octobre', String(octobre));
}
if (decembre !== undefined) {
formData.append('decembre', String(decembre));
}
if (nauvembre !== undefined) {
formData.append('nauvembre', String(nauvembre));
}

return this.http.post<any>(`${this.baseUrl}/updateuser/${userId}`, formData);
}
updateUser2(userId: number,
  username?: string,
    email?: string,
  telephone?: number,
): Observable<any> {
const formData: FormData = new FormData();

if (username !== undefined) {
formData.append('username',username);
}
if (email !== undefined) {
formData.append('poiemaild', email);
}
if (telephone !== undefined) {
formData.append('telephone', String(telephone));
}
return this.http.post<any>(`${this.baseUrl}/updateuser2/${userId}`, formData);
}
updateUser3(userId: number,
  confibm?: number,
  poid?: number,
): Observable<any> {
const formData: FormData = new FormData();
if (confibm !== undefined) {
formData.append('confibm', String(confibm));
}
if (poid !== undefined) {
  formData.append('poid', String(poid));
  }
return this.http.post<any>(`${this.baseUrl}/updateuser3/${userId}`, formData);
}
UpdateUserImage(userId: number, image: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('image', image, image.name);
  return this.http.post<any>(`${this.baseUrl}/userimage/${userId}`, formData);
}
search(query: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/search?query=${query}`);
}
sendMessage(userId: number, recipientId: number, messageContent: string): Observable<string> {
  const url = `${this.baseUrl}/send-message/${userId}/${recipientId}`;
  return this.http.post<string>(url, messageContent);
}

getMessagesBySenderIdAndRecipientId(userId: number, recipientId: number): Observable<message[]> {
  return this.http.get<message[]>(`${this.baseUrl}/message/${userId}/${recipientId}`);
}
getMessagesBySenderIdAndRecipientId2(recipientId: number,userId: number): Observable<message[]> {
  return this.http.get<message[]>(`${this.baseUrl}/message2/${recipientId}/${userId}`);
}
getAllUsersAndCoaches(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/allusers`);
}
searchuser(query: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/searchUser?query=${query}`);
}
getAllChops(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/getallchop`);
}
searchchopuser(query: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/searchChop?query=${query}`);
}
getChopsByTypeTchort(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/tchort`);
}
getChopsByTypeShort(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/short`);
}
getChopsByTypePantalon(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/pontallon`);
}
getChopsByTypeDébardeur(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/Débardeur`);
}
getChopsByTypeSurvêtement(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/Survêtement`);
}
getChopsByTypeLegging(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/Legging`);
}
getChopsByTypeChaussures(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/Chaussures`);
}
searchChopsByPriceRange(minPrice: number, maxPrice: number): Observable<chop[]> {
  const params = new HttpParams()
    .set('min', minPrice.toString())
    .set('max', maxPrice.toString());
  return this.http.get<chop[]>(`${this.baseUrl}/chopsprix`, { params });
}
getChopsByTypewheyprotein(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/wheyprotein`);
}
getChopsByTypecaséine(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/caséine`);
}
getChopsByTypePOId(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/poid`);
}
getChopsByTypeRiz(): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/riz`);
}
getChopById(id: number): Observable<chop> {
  return this.http.get<chop>(`${this.baseUrl}/chop/${id}`);
}
addToCart(userId: number, id: number): Observable<any> {
  return this.http.post(`${this.baseUrl}/addtocart/${userId}/${id}`, null, { responseType: 'text' as 'json' });
}
countChopsByUserId(userId: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/countchop/${userId}`);
}
getChopsByUserId(userId: number): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/userpanier/${userId}`);
}
ajouterRevieux(userId: number, id: number, commentaire: string): Observable<any> {
  const url = `${this.baseUrl}/revieuxchop/${userId}/${id}`;
  return this.http.post<any>(url, { commentaire });
}
getReviewsCountByChopId(id: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/choprevcount/${id}`);
}
calculatePriceWithPercentageDiscount(id: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/calculateprice/${id}`);
}
getChopRevieuxByChopId(id: number): Observable<choprevieux[]> {
  return this.http.get<choprevieux[]>(`${this.baseUrl}/findrevieuxByChopId/${id}`)

}
addToCartpayment(userId: number, id: number): Observable<any> {
  return this.http.post(`${this.baseUrl}/addToCartpayment/${userId}/${id}`, null, { responseType: 'text' as 'json' });
}
userpanierpayment(userId: number): Observable<chop[]> {
  return this.http.get<chop[]>(`${this.baseUrl}/userpanierpayment/${userId}`);
}
generatePayment(userId: number, paymentRequest: PaymentRequest): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  const url = `${this.baseUrl}/generatepayment/${userId}`;
  return this.http.post<any>(url, paymentRequest, { headers: headers });
}
verifyPayment(paymentId: string): Observable<any> {
  const url = `${this.apiUrl}/verify/${paymentId}`;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  return this.http.get(url, { headers, observe: 'response' });
}

getOffreById(id: number): Observable<offre> {
  return this.http.get<offre>(`${this.baseUrl}/offres/${id}`);
}
addtocartoffee(userId: number, id: number): Observable<any> {
  return this.http.post(`${this.baseUrl}/addtocartoffee/${userId}/${id}`, null, { responseType: 'text' as 'json' });
}
getQrCode(userId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/qrcode/${userId}`, { responseType: 'blob' }); // Utilisation de responseType: 'blob' pour recevoir les données binaires du code QR
}
generatePayment2(userId: number, id: number, paymentRequest: PaymentRequest): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  const url = `${this.baseUrl}/generatepayment2/${userId}/${id}`;
  return this.http.post<any>(url, paymentRequest, { headers: headers });
}
confirmRegistration(email: string): Observable<any> {
  const url = `${this.baseUrl}/confirm-registration/${email}`;
  return this.http.get<any>(url);
}
sendRoomInformationEmail(userEmail: string): Observable<string> {
  const formData: FormData = new FormData();
  formData.append('userEmail', userEmail);
  
  return this.http.post(`${this.baseUrl}/sendsalleinfoemail`, formData, {
    responseType: 'text' // Set the response type to 'text'
  }).pipe(
    catchError(this.handleError<string>('sendRoomInformationEmail'))
  );
}
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);

    // Check if the error is an instance of HttpErrorResponse
    if (error instanceof HttpErrorResponse && error.status === 200) {
      // If it's a successful response with status 200, treat it as plain text
      return of(error.error as T);
    }

    // Re-throw the error since it's not the expected response
    throw error;
  };
}
addEvent(event: eventtes, userId: number): Observable<Event> {
  return this.http.post<Event>(`${this.baseUrl}/evcotch/${userId}`, event);
}
getAllEvents(): Observable<eventtes[]> {
  return this.http.get<eventtes[]>(`${this.baseUrl}/getallevent`);
}
UpdateEventImage(id: number, image: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('image', image, image.name);
  return this.http.post<any>(`${this.baseUrl}/eventsimage2/${id}`, formData);
}

updateImagesById(id: number, imageFile3: File, imageFile4: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('imageFile3', imageFile3);
  formData.append('imageFile4', imageFile4);
  return this.http.post<any>(`${this.baseUrl}/${id}/images34`, formData);
}
updateImageTitleById(id: number, image2: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('image2', image2, image2.name);
  return this.http.post<any>(`${this.baseUrl}/eventsimagetitle/${id}`, formData);
}
createPost(id: number, Vedeo: Vedeo): Observable<Vedeo> {
  return this.http.post<Vedeo>(`${this.baseUrl}/vedeo/${id}`, Vedeo);
}
getAllVideo(): Observable<Vedeo[]> {
  return this.http.get<Vedeo[]>(`${this.baseUrl}/allvideo`);
}
sendEmail(emailData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/sendEmailadmin`, emailData);
}
getAllRevieuxClasses(): Observable<reieuxclasses[]> {
  return this.http.get<reieuxclasses[]>(`${this.baseUrl}/getclassesRevieux`);
}
getAllClientExperiences(): Observable<ClientExperienc[]> {
  return this.http.get<ClientExperienc[]>(`${this.baseUrl}/allexperience`);
}
}
 