import moment from 'moment'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateProfile, clearErr, updateAvatar, linkAccount, unlinkAccount} from './profileActions'
import Avatar from './avatar.js'
export const ProfileForm = ({username, avatar, headline, zipcode, Email, 
  birthDate, password, update, clear, errorMessage, successMs, oauth, _updateAvatar, linkAcc, unlinkAcc, provider}) => {
  //profile component needs to transmit multiplie information, that's there are so many variables
  let _headline
  let displayName
  let email
  let zip
  let _birthDate
  let _password
  let confirmPassword
  let failmsg
  let failtxt = errorMessage
  let bod = moment(new Date(birthDate)).format('YYYY-MM-DD')
  const _update = () => {
    clear();
    update({
      headline: _headline.value != ''? _headline.value : headline,
      email: email.value != '' ? email.value : Email,
      zipcode: zip.value != '' ? zip.value : zipcode,
      password: _password.value != '' ? _password.value : password,
      confirmPassword: confirmPassword.value != '' ? confirmPassword.value : password
    });
  }

  const _linkAcc = () => {
    clear();
    linkAcc({username: username, provider: provider})
  }
   const _unlinkAcc = () => {
    clear();
    unlinkAcc({username: username, provider: provider})
  }
  //conditional rendering error information
  if (errorMessage.length != 0) {
    failmsg = <div className='alert alert-danger alert-dismissable fade in' role='alert'>
      <p>{errorMessage}</p>
      </div>;
  } else if (successMs.length != 0) {
    failmsg = <div className='alert alert-success alert-dismissable fade in' role='alert'>
      <p id='profile-sucmsg'>{successMs}</p>
      </div>;
  } else {
    failmsg = <div></div>
  }
  //return content be rendered
  return (
    <div className='profile-card'>
      <Avatar/>
      <div className='update-container'>
        <input className='upload-inline' type='file' accept='image/*' onChange={(e) => _updateAvatar(e)}></input>
        <button id='updateProfile' type='submit' className='update-button' onClick={_update}><i className='glyphicon glyphicon-pencil'></i> Update</button>
      </div>
      
      <div>{failmsg}</div>
      <div className='user-profile'>
        {oauth == 1 && <div><button id="link" onClick={_linkAcc} className="btn btn-primary pure-button">Link account</button></div>}
        {oauth == 1 && <div><button id="unlink" onClick={_unlinkAcc} className="btn btn-primary pure-button">unLink account</button></div>}
        <div className='user-info'><p>Headline:</p><input className='update-info' placeholder={headline} name='headline' ref={(node) => _headline = node}/></div>
        <div className='user-info'><p>Display name:</p><input className='update-info' placeholder={username} name='displayName' ref={(node) => displayName = node}/></div>
        <div className='user-info'><p>Email:</p><input id='profile-email' className='update-info' placeholder={Email} name='email' ref={(node) => email = node}/></div>
        <div className='user-info'><p>Zipcode:</p><input id='profile-zipcode' className='update-info' placeholder={zipcode} name='zip' ref={(node) => zip = node}/></div>
        <div className='user-info'><p>Birth date:</p><input className='update-info' placeholder={bod} name='_birthDate' ref={(node) => _birthDate = node} disabled/></div>
        <div className='user-info'><p>Password:</p><input id='profile-password' className='update-info' name='_password' ref={(node) => _password = node} /></div>
        <div className='user-info'><p>Confirm Password:</p><input id='profile-confirm-password' className='update-info' name='confirmPassword' ref={(node) => confirmPassword = node}/></div>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({username: state.username,
    headline: state.headline,
    avatar: state.avatar,
    zipcode: state.zipcode,
    Email: state.email,
    birthDate: state.dob,
    password: state.password,
    errorMessage: state.errorMsg,
    successMs: state.successMsg,
    oauth: state.Oauth,
  provider: state.provider}),
  (dispatch) => ({clear: () => dispatch(clearErr()), 
    update: (updateinfo) => updateProfile(updateinfo)(dispatch),
    _updateAvatar: (e) => updateAvatar(e)(dispatch),
    linkAcc: (e) => linkAccount(e)(dispatch),
  unlinkAcc: (e) => unlinkAccount(e)(dispatch)})
  )(ProfileForm)
