import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences  } from '@capacitor/preferences';
import {UserPhoto} from "../interfaces/user-photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE = 'photos';
  constructor() { }

  public async loadSaved() {
    const photoList = await Preferences.get({
      key : this.PHOTO_STORAGE
    });
    this.photos = JSON.parse(photoList.value!) || [];
    // Display the photo by reading into base64 format
    for (const photo of this.photos) {
      // Read each saved photo's data from the Filesystem
      const readFile = await Filesystem.readFile({
        path: photo.filePath,
        directory: Directory.Data,
      });

      // Web platform only: Load the photo as base64 data
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }
  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto(
      { resultType: CameraResultType.Uri, source: CameraSource.Camera, quality: 100 });

    /**
     * On sauve la capture de la webcam en fichier au format UserPhoto
     * pour charger le tableau photos
     */
    const saveImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(<UserPhoto>saveImageFile);
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
    return saveImageFile
  }

  /**
   * On prend en paramètre la photo
   * on la transforme en Base64 pour le stockage
   * pour qu'il soit unique on crée un fichier avec la date().getTime (long) avec l'extension .jpeg
   * Puis on crée le fichier : Filesystem de capacitor (IOS ANDROID LINUX MAC WINDOWS BROWSER)
   *
   * ON CONVERTIE LE DUMP MEMOIRE DE LA PHOTO EN FICHIER JPEG
   * @param photo
   * @returns
   */
  private async savePicture(photo: Photo){
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    return {
      filePath: fileName,
      webviewPath: photo.webPath
    };
  }
  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
