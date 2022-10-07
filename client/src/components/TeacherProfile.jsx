import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  ProfileContainer,
  ProfilePicture,
  ProfileBackground,
  ProfileAccountInfo,
  ProfileFriendsList,
  ProfileChatContainer,
  LightGreyButton,
  StyledButton,
  StyledFriend,
  StyledFriendIcons,
  StyledFriendSearchSpan,
  StyledFriendSearch,
  StyledEditProfileButton,
  IconCircleDiv,
  ProfileCalendarInfo,
  SelectedTeacherFriend,
  TeachingLanguageSpan
} from './StyledComponents/StyledComponents.jsx'
import axios from 'axios';
import FormData from 'form-data'
import TeacherClassListModal from './LoginSignup/Teacher/TeacherClassListModal.jsx';
import PendingRequests from './PendingRequests.jsx';
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddFriendModal from './AddFriendModal.jsx';
import EditInfoModal from './EditInfoModal.jsx';
import TeacherCalendar from '../components/LoginSignup/Teacher/TeacherCalendar.jsx';
import { Outlet, Link } from "react-router-dom";
import { serverURL } from '../config.js'
import ClassListModal from '../components/LoginSignup/Teacher/ClassListModal.jsx'
import DateTimePicker from 'react-datetime-picker';
import ScheduleModal from '../components/LoginSignup/Teacher/ScheduleModal.jsx'
import PendingMeetingModal from './LoginSignup/Teacher/PendingMeetingModal'
import FriendsModal from './FriendsModal.jsx'



const LeftButton = styled.button`
  position: absolute;
  width: 3%;
  top: 0;
  margin-top: 1rem;
  margin-left: 45%;
  height: 10%;
  border: none;
  background-color: #38698fba;
  border: 1px solid #f5f5f5;
  color: #f5f5f5;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 50px;
  z-index: 2;
  &:hover {
    background-color: #383838c8;
    border-radius: 50px;
  }
`
// right button for carousel
const RightButton = styled.button`
  position: absolute;
  top: 0;
  margin-right: 45%;
  right: 1%;
  margin-top: 1rem;
  width: 3%;
  height: 10%;
  background-color: #38698fba;
  color: #f5f5f5;
  transition: 0.5s;
  border-radius: 50px;
  cursor: pointer;
  &:hover {
    background-color: #383838c8;
    border-radius: 50px;
  }
  @media (max-width: 600px) {
      right:30%;
    }
  border: 1px solid #f5f5f5;
`


export default function TeacherProfile(props) {
  const [profileBackground, setProfileBackground] = useState(['https://images.unsplash.com/photo-1470125634816-ede3f51bbb42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80', 'https://images.unsplash.com/photo-1552288084-454d4fa5caa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2170&q=80', 'https://images.unsplash.com/photo-1606335270813-52d62bfc5e69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2525&q=80', 'https://images.unsplash.com/photo-1591467847734-12186c3a3f1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2156&q=80', 'https://images.unsplash.com/photo-1603731125936-1c28b35b1659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1905&q=80', 'https://images.unsplash.com/photo-1590918836821-3c692676add7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80']);
  const [profileBackgroundDark, setProfileBackgroundDark] = useState(['https://images.unsplash.com/photo-1475738198235-4b30fc20cff4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80', 'https://images.unsplash.com/photo-1552288084-454d4fa5caa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2170&q=80', 'https://images.unsplash.com/photo-1504069424204-a54566b5165c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80', 'https://images.unsplash.com/photo-1529984489975-079884dc3bc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2320&q=80', 'https://images.unsplash.com/photo-1538254815620-1d3e0b3f14cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2416&q=80']);
  const [teacherShow, setTeacherShow] = useState(false);
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [currentFriend, setCurrentFriend] = useState(0);
  const [friendSearch, setFriendSearch] = useState('');
  const [editInfoShow, setEditInfoShow] = useState(false);
  const [teacherId, setTeacherId] = useState(props.userId);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [modalClassName, setModalClassName] = useState('')
  const [classShow, setClassShow] = useState(false)
  const [usersWithSameLanguage, setUsersWithSameLanguage] = useState([]);
  const [pickDateShow, setPickDateShow] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [meetings, setMeetings] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])
  // const [meetings, setMeetings] = useState([{receiver_id: 1, first_name: 'Greta', last_name: 'Grover', start_time: 'Wed, 05 Oct 2022 20:34:12 GMT', status: false }, { receiver_id: 2, first_name: 'Nick', last_name: 'Kozlarek', start_time: 'Thu, 06 Oct 2022 20:34:12 GMT', status: true },])
  const [pendingMeetings, setPendingMeetings] = useState([])
  // const [pendingMeetings, setPendingMeetings] = useState([{requester_id: 1, first_name: 'Andrew', last_name: 'Cho', start_time: 'Thu, 06 Oct 2022 20:34:12 GMT', status: false }])
  const [pendingShow, setPendingShow] = useState(false)
  const [selected, setSelected] = useState(null);
  const [filteredFriends, setFilteredFriends] = useState(props.friends);
  const [filtering, setFiltering] = useState(false);
  const [friendSelected, setFriendSelected] = useState(false);
  const [taughtLanguages, setTaughtLanguages] = useState([])


  var [x, setx] = useState(0);
  // function for the image to expand on click
  // on click function to move the carousel to the left
  const goLeft = () => {
    setx(x - 1);
  }
  // on click function to move the carousel to the right
  const goRight = () => {
    setx(x + 1);
  }

  // api requests to retrieve all necessary data
  const retrieveAccountInfo = axios.get(`${serverURL}/accounts/id`, {
    params: {
      accountId: props.userId
    }
  })

  const retrieveFriends = axios.get(`${serverURL}/friend`, {
    params: {
      accountId: props.userId
    }
  })

  const retrieveLanguages = axios.get(`${serverURL}/languages`);

  const getClasses = ()=>{
    console.log('getClasses is running')
    axios.get(`${serverURL}/classes`, { params: { teacher_id: props.userId } })
      .then((classData) => {
      setClasses(classData.data)
      })
      .catch((err) => { console.log('error getting classes ', err) })
  }

  useEffect(() => {
    getClasses()

    axios.get(`${serverURL}/meetings`, { params: { user_id: props.userId } })
      .then((meetingsRes) => {
        setMeetings(meetingsRes.data)
      })
      .catch(err => { console.log('error getting meetings ', err) })

    axios.get(`${serverURL}/meetings/requests`, { params: { user_id: props.userId } })
      .then((pendingMeetings) => {
        setPendingMeetings(pendingMeetings.data)
      })
  }, [])

  useEffect(() => {
    Promise.all([retrieveAccountInfo, retrieveFriends, retrieveLanguages])
    .then((data) => {
      console.log(data);
      var apiAccountInfo = data[0].data;
      var apiFriends = data[1].data;
      var apiLanguages = data[2].data;
      // setting account info
      props.setEmail(apiAccountInfo.email);
      props.setFirstName(apiAccountInfo.first_name);
      props.setLastName(apiAccountInfo.last_name);
      // setting friends
      props.setFriends(apiFriends);
      // setting languages
      props.setLanguages(apiLanguages);
    }).catch((err) => {
      console.log('error retrieving data', err);
    });
  }, []);

  const onFriendClick = (e) => {
    setCurrentFriend(parseInt(e.target.id))
  }
  // useEffect(() => {
  //   if (currentFriend !== '') {
  //     setShow(true);
  //   }
  // }, [currentFriend])

  const onAddFriendClick = () => {
    axios.get(`${serverURL}/accounts`)
    .then(({data}) => {
      return data.map(account => {
        axios.get(`${serverURL}/languages/taught`, {
          params: {
            accountId: account.account_id
          }
        })
        .then(({data}) => account.language = data)
      return account;
      })
    })
    .then(accounts => setUsersWithSameLanguage(accounts))
    .catch((err) => {
      console.log(err);
    })
    setAddShow(true);
  }

  const onPendingRequestsClick = () => {
    axios.get(`${serverURL}/friend/requests`)
    .then(({data}) => {
      setPendingRequests(data);
    })
    setShowPending(true);
  }

  const onClassListClick = (e, class_name) => {
    e.preventDefault()
    axios.get(`${serverURL}/classes/students`, { params: { class_id: e.target.id } }).then((students) => {
      setStudents(students.data)
      setModalClassName(class_name)
      setClassShow(true)
    }).catch(err => { console.log(err) })
  }


  const onFriendSearch = (e) => {
    setFriendSearch(e.target.value);
  }

  const onEditInfo = () => {
    setEditInfoShow(true);
  }



  const filterFriends = (e) => {
    setFilteredFriends(props.friends.filter(function (str) {
        var fullName = str.first_name + ' ' + str.last_name
        var lowered = fullName.toLowerCase();
        return lowered.includes(e.target.value);
      }));
    setFiltering(true);
  }



  const onCalendarClick = (dateTime, friend, user) => {
    setPickDateShow(false)
    var GMTTime = dateTime.toUTCString()
    axios.post(`${serverURL}/meetings`, { requesterId: props.userId, receiverId: friend, start_time: GMTTime })
      .then((meetingsRes) => {
        setMeetings(meetingsRes.data)
      }).catch((err) => {
        console.log(err)
      })

}

const selectFriend = (e) => {
  setSelected(e.target.id);
  axios.get(`${serverURL}/languages/taught`, {
    params: {
      accountId: 6
    }
  }).then((data) => {
    console.log(data.data);
    setTaughtLanguages(data.data);
    setFriendSelected(true);
  }).catch((err) => {
    console.log(err);
  })

}

const unfilteredFriends = props.friends.map((friend, index) => {
    return (
      <StyledFriend key={friend.account_id} >
          <div style={{ fontWeight: 'bold' }} id={index} onClick={selectFriend}>{friend.first_name + ' ' + friend.last_name}</div>
          {pickDateShow && <ScheduleModal onClose={(dateTime) => { onCalendarClick(dateTime, friend.account_id, props.userId) }} friend={friend}/>}
            <StyledFriendIcons>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Calendar_icon_2.svg/989px-Calendar_icon_2.svg.png" alt="calendar icon for setting up a video call" onClick={() => { setPickDateShow(true) }} />
              <Link to="/messages">
                <img src='https://cdn-icons-png.flaticon.com/512/71/71580.png' alt="message icon for starting a message chat with a friend"/>
              </Link>
              <img src='https://i.pinimg.com/originals/1f/6f/48/1f6f482d8e1da80055ded006df4728e3.jpg' alt="message icon for starting a video chat"/>
            </StyledFriendIcons>
        </StyledFriend>
    )
})

const filteredFriendsList = filteredFriends.map((friend, index) => {
  return (
    <StyledFriend  id={friend.account_id} key={friend.account_id}>
      <div style={{ fontWeight: 'bold' }} id={index} onClick={selectFriend}>{friend.first_name + ' ' + friend.last_name}</div>
      {pickDateShow && <ScheduleModal onClose={(dateTime) => { onCalendarClick(dateTime, friend.account_id, props.userId) }} friend={friend}/>}
        <StyledFriendIcons>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Calendar_icon_2.svg/989px-Calendar_icon_2.svg.png" alt="calendar icon for setting up a video call" onClick={() => { setPickDateShow(true) }} />
          <Link to="/messages">
              <img src='https://cdn-icons-png.flaticon.com/512/71/71580.png' />
          </Link>
          <img src='https://cdn-icons-png.flaticon.com/512/71/71580.png' alt="message icon for starting a message chat with a friend" />
        </StyledFriendIcons>
    </StyledFriend>
  )
})

  const handleDelete = (e, receiverId, requesterId, start_time) => {
    e.preventDefault()
    var start_time = new Date(start_time)
    var GMTTime = start_time.toUTCString()
    axios.delete(`${serverURL}/meetings`, { params: { receiverId: receiverId, requesterId: requesterId, dateTime: GMTTime } })
      .then(() => {
        axios.get(`${serverURL}/meetings`, { params: { user_id: props.userId } })
          .then((meetingsRes) => {
            setMeetings(meetingsRes.data)
          })
          .catch(err => { console.log('error getting meetings ', err) })
      })
      .catch(err => { console.log('error deleting meeting ', err) })
  }
  const acceptMeeting = (e, requesterId, receiverId, start_time) => {
    e.preventDefault()
    var start_time = new Date(start_time)
    var GMTtime = start_time.toUTCString()
    axios.put(`${serverURL}/meetings`, { receiverId: receiverId, requesterId: requesterId, dateTime: GMTtime })
      .then(() => {
        axios.get(`${serverURL}/meetings`, { params: { user_id: props.userId } })
          .then((meetingsRes) => {
            setMeetings(meetingsRes.data)
          })
          .catch(err => { console.log('error getting meetings ', err) })

        axios.get(`${serverURL}/meetings/requests`, { params: { user_id: props.userId } })
          .then((pendingMeetings) => {
            setPendingMeetings(pendingMeetings.data)
          })

      })
      .catch(err => { console.log('error accepting meeting ', err) })

  }

  const denyMeeting = (e, requesterId, receiverId, start_time) => {
    e.preventDefault()
    var start_time = new Date(start_time)
    var GMTtime = start_time.toUTCString()
    axios.delete(`${serverURL}/meetings`, { params: { receiverId: receiverId, requesterId: requesterId, dateTime: GMTtime } })
      .then(() => {
        axios.get(`${serverURL}/meetings`, { params: { user_id: props.userId } })
          .then((meetingsRes) => {
            console.log('non pending meetings ', meetingsRes)
            setMeetings(meetingsRes.data)
          })
          .catch(err => { console.log('error getting meetings ', err) })

        axios.get(`${serverURL}/meetings/requests`, { params: { user_id: props.userId } })
          .then((pendingMeetings) => {
            console.log('pending meetings ', pendingMeetings)
            setPendingMeetings(pendingMeetings.data)
          })

      })
      .catch(err => { console.log('error denying meeting ', err) })

  }

  return (
    <div>
      <ProfileContainer>
        <ProfilePicture src={props.profilePicture} />
        {!props.darkTheme ?
          <ProfileBackground>
            <img src={profileBackground[x]} style={{ textAlign: 'left', display: 'block' }} />
            {x === 0 ? null : <LeftButton data-testid='left-arrow' onClick={goLeft}><FontAwesomeIcon icon={faChevronLeft} /></LeftButton>}
            {x >= profileBackground.length - 1 ? null : <RightButton data-testid='right-arrow' onClick={goRight}><FontAwesomeIcon icon={faChevronRight} /></RightButton>}
          </ProfileBackground> :
          <ProfileBackground>
            <img src={profileBackgroundDark[x]} style={{ textAlign: 'left', display: 'block' }} />
            {x === 0 ? null : <LeftButton data-testid='left-arrow' onClick={goLeft}><FontAwesomeIcon icon={faChevronLeft} /></LeftButton>}
            {x >= profileBackgroundDark.length - 1 ? null : <RightButton data-testid='right-arrow' onClick={goRight}><FontAwesomeIcon icon={faChevronRight} /></RightButton>}
          </ProfileBackground>
        }
        <ProfileCalendarInfo>

          <TeacherCalendar teacherId={teacherId} meetings={meetings} handleDelete={handleDelete} />
          {pendingMeetings.length > 0 && <StyledButton style={{ marginTop: '0rem', width: '12rem' }} onClick={() => { setPendingShow(true) }}>Pending Meetings</StyledButton>}
          {pendingShow && <PendingMeetingModal onClose={() => { setPendingShow(false) }} pendingMeetings={pendingMeetings} teacherId={teacherId} acceptMeeting={acceptMeeting} denyMeeting={denyMeeting} />}
        </ProfileCalendarInfo>

        <ProfileFriendsList style={{ width: '30rem', left: '32%' }}>
          <StyledFriendSearchSpan>
            <h3><strong>Friends List</strong></h3>
            <StyledFriendSearch>
              <input name='friendfilter' type='text' placeholder='filter' onChange={filterFriends}></input>
            </StyledFriendSearch>
          </StyledFriendSearchSpan>
          {!friendSelected ? <p>{!filtering ? unfilteredFriends : filteredFriendsList}</p> :
            <SelectedTeacherFriend>
              <span>
                <h2>{props.friends[parseInt(selected)].first_name + ' ' + props.friends[parseInt(selected)].last_name}</h2>
                <TeachingLanguageSpan>
                  <h4>
                    Languages Taught:
                  </h4>
                  <ul>
                    {taughtLanguages.map((language, index) => {
                      return (
                        <li>
                          {language.lang_name}
                          <br/>
                          Level Taught: {language.taught_level}
                        </li>
                      )
                    })}
                  </ul>
                </TeachingLanguageSpan>
              </span>
              <StyledButton onClick={() => {
                setFriendSelected(false);
              }}>Back to Friends List</StyledButton>
            </SelectedTeacherFriend>
          }


          <StyledButton style={{ marginTop: '0rem', width: '12rem' }} onClick={onAddFriendClick}>ADD FRIEND</StyledButton>
          <StyledButton onClick={onPendingRequestsClick}>PENDING REQUESTS</StyledButton>
          {teacherShow && <TeacherClassListModal userId={teacherId} onClose={() => setTeacherShow(false)} show={teacherShow} getClasses={getClasses}/>}
        </ProfileFriendsList>
        <ProfileFriendsList style={{ width: '23rem', left: '71%' }}>
          <StyledFriendSearchSpan style={{ justifyContent: 'center' }}>
            <h3><strong>Class List</strong></h3>
          </StyledFriendSearchSpan>
          <p>
            {classes.map(teacherClass => {
              return (
                <StyledFriend key={teacherClass.class_id} id={teacherClass.class_id} onClick={(e) => { onClassListClick(e, teacherClass.class_name) }} >
                  <div style={{ fontWeight: 'bold' }} >{teacherClass.class_name}</div>
                  <StyledFriendIcons>
                  </StyledFriendIcons>
                </StyledFriend>
              )
            })}
          </p>
          {classShow && <ClassListModal onClose={() => setClassShow(false)} classShow={classShow} modalClassName={modalClassName} students={students} />}
          <StyledButton style={{ marginTop: '0rem', marginLeft: '1rem', width: '12rem' }} onClick={() => { setTeacherShow(true) }}>ADD CLASS LIST</StyledButton>


        </ProfileFriendsList>
      </ProfileContainer>
      <FriendsModal onClose={() => setShow(false)} show={show} friend={currentFriend} />
      <AddFriendModal onClose={() => setAddShow(false)} show={addShow} onFriendSearch={onFriendSearch} usersWithSameLanguage={usersWithSameLanguage} languages={props.languages} userId={props.userId}/>
      <PendingRequests onClose={() => setShowPending(false)} show={showPending} pendingRequests={pendingRequests}/>
      <EditInfoModal onClose={() => setEditInfoShow(false)} show={editInfoShow} />
    </div>
  )
}