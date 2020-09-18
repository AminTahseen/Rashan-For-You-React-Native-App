import firebase, { auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {Alert,AsyncStorage} from 'react-native';

let RequestsData = [];
let SuppierRequestData = [];
var request_obj ='';
var supplier_obj ='';
var delivery_obj='';

export function CreateSubmitRequest(request)
{
    firebase.database().ref('supplier_requests/').push(request)
    .then(() => {
      Alert.alert('Waiting for approval !');
    })
    .catch(err => {
      Alert.alert(err);
    });    
};

export function CreateSubmitRequestForRashan(request)
{
    firebase.database().ref('requests_for_rashan/').push(request)
    .then(() => {
      Alert.alert('Request submitted !');
    })
    .catch(err => {
      Alert.alert(err);
    });    
};
export function CreateDeliveryForRashan(details)
{
    firebase.database().ref('delivery_for_rashan/').push(details)
    .then(() => {
      Alert.alert('Delivery on its way !');
    })
    .catch(err => {
      Alert.alert(err);
    });    
};

export function fetchRequestData() {
    firebase.database().ref('requests_for_rashan/').once('value').then(function(snapshot) {
       if (!snapshot) {
          console.log('An error occured');
          return RequestsData;
       } else {
        snapshot.forEach(element => {
        request_obj = {
            key:element.key,
            request_details:element.val().request_details,
            request_approx_amount:element.val().request_approx_amount,
            number_of_peoples:element.val().number_of_peoples,
            request_by_userID:element.val().request_by_userID,
            rashan_provided:element.val().rashan_provided,
          };
        //  console.log(request_obj)
         RequestsData.push(request_obj);
        });
       }
    })
    return RequestsData;
  };


  export function fetchSupplierRequestData(receiver_req_id,send_by_userId) {
    firebase.database().ref('supplier_requests/').once('value').then(function(snapshot) {
       if (!snapshot) {
          console.log('An error occured');
          return RequestsData;
       } else {
        snapshot.forEach(element => {
          if(element.val().receiver_request_id===receiver_req_id && element.val().send_by_user_id===send_by_userId)
          {
            supplier_obj = {
              key:element.key,
              approval_status:element.val().approval_status,
              package_id:element.val().package_id,
              receiver_request_id:element.val().receiver_request_id,
              receiver_user_id:element.val().receiver_user_id,
              send_by_user_id:element.val().send_by_user_id,
            };
          }else
          {

          }
     
        //  console.log(request_obj)
        });
       }
    })
    return supplier_obj;
  };

  
  export function fetchSupplierRequestDataForPackage(receiver_req_id) {
    firebase.database().ref('supplier_requests/').once('value').then(function(snapshot) {
       if (!snapshot) {
          console.log('An error occured');
          return RequestsData;
       } else {
        snapshot.forEach(element => {
          if(element.val().receiver_request_id===receiver_req_id)
          {
            supplier_obj = {
              key:element.key,
              approval_status:element.val().approval_status,
              package_id:element.val().package_id,
              receiver_request_id:element.val().receiver_request_id,
              receiver_user_id:element.val().receiver_user_id,
              send_by_user_id:element.val().send_by_user_id,
            };
            SuppierRequestData.push(supplier_obj);
          }else
          {

          }
          
        //  console.log(request_obj)
        });
       }
    })
    return SuppierRequestData;
  };

export function UpdateSupplierRequest(key)
{
    firebase.database().ref('supplier_requests/'+key).update({approval_status: 'Approved'})
    .then(() => {
      Alert.alert('Request Approved !');
    })
    .catch(err => {
      Alert.alert(err);
    });    
};

export function UpdateDeliveryRequest(deliv_receiver_id,request_id)
{
  firebase.database().ref('delivery_for_rashan/').once('value').then(function(snapshot) {
    if (!snapshot) {
       console.log('An error occured');
       return RequestsData;
    } else {
     snapshot.forEach(element => {
       if(element.val().deliver_to_receiver_id==deliv_receiver_id && element.val().delivered_to_receiver_request_id==request_id)
       {

        firebase.database().ref('delivery_for_rashan/'+element.key).update({delivery_status: 'Delivered'})
        .then(() => {
          Alert.alert('Rashan Delivered !');
        })
        .catch(err => {
          Alert.alert(err);
        }); 
       }else
       {

       }
       
     //  console.log(request_obj)
     });
    }
 })
}

export function UpdateREQUESTSFORRASHAN(key)
{
  firebase.database().ref('requests_for_rashan/'+key).update({rashan_provided: 'Provided'})
  .then(() => {
    Alert.alert('Rashan Has Been Provided !');
  })
  .catch(err => {
    Alert.alert(err);
  });     
};

export function fetchDeliveryStatus(receiver_req_id) {
  firebase.database().ref('delivery_for_rashan/').once('value').then(function(snapshot) {
     if (!snapshot) {
        console.log('An error occured');
        return RequestsData;
     } else {
      snapshot.forEach(element => {
        if(element.val().delivered_to_receiver_request_id===receiver_req_id)
        {
          delivery_obj = {
            key:element.key,
            deliver_to_receiver_id:element.val().deliver_to_receiver_id,
            delivered_by_sender_id:element.val().delivered_by_sender_id,
            delivered_package_id:element.val().delivered_package_id,
            delivered_to_receiver_request_id:element.val().delivered_to_receiver_request_id,
            delivery_status:element.val().delivery_status,
            delivery_total_amount:element.val().delivery_total_amount,
          };
        }else
        {

        }
      });
     }
  })
  return delivery_obj;
};
