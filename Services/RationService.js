import firebase, { auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {Alert,AsyncStorage} from 'react-native';


let RationData = [];
var package_obj ='';

export function CreateRationPackage(packages)
{
    firebase.database().ref('ration_package/').push(packages)
    .then(() => {
      Alert.alert('Package Created !');
    })
    .catch(err => {
      Alert.alert(err);
    });    
};
export function ProvideRationPackage(data)
{
    firebase.database().ref('ration_package/').push(data)
    .then(() => {
      Alert.alert('Package Created !');
    })
    .catch(err => {
      Alert.alert(err);
    });    
};
export function fetchPackagesData() {
  firebase.database().ref('ration_package/').once('value').then(function(snapshot) {
     if (!snapshot) {
        console.log('An error occured');
        return RationData;
     } else {
      snapshot.forEach(element => {
        package_obj = {
          key:element.key,
          package_name:element.val().package_name,
          package_rate: element.val().package_rate,
          package_how_long:element.val().package_how_long,
          package_details: element.val().package_details,
          package_by_userID: element.val().package_by_userID,
        };
        if(RationData.includes(package_obj)){
        }else{
          RationData.push(package_obj);
        }
      //  console.log(package_obj)
      });
     }
  })
  return RationData;
};

export function fetchCertainPackageData(pkgID) {
  firebase.database().ref('ration_package/' + pkgID).once('value').then(function(snapshot) {
     if (!snapshot) {
        console.log('An error occured');
        //return "error"
     } else {
      package_obj = {
        key: snapshot.key,
        package_name: snapshot.val().package_name,
        package_rate: snapshot.val().package_rate,
        package_how_long: snapshot.val().package_how_long,
        package_details: snapshot.val().package_details,
        package_by_userID: snapshot.val().package_by_userID,
      };
     }
  })
 return package_obj;
};
