
import React, { useEffect, useRef, useState } from 'react'
import styles from './MainPage.module.css'
import CreateGroup from '../creategroup/CreateGroup';
import CreateNotes from '../createnote/CreateNotes';
import bg from '../../assets/image-removebg-preview 1.png'
import axios from 'axios';

const MainPage = () => {
  const [showComponent,setShowComponent]=useState(false);
  const [groups,setGroups]=useState([]);
  const [selectedGroup,setSelectedGroup]=useState(null);
  const groupsConatinerRef=useRef(null);
  const createGroupRef = useRef(null); 

  useEffect(()=>{
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/group/all');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  },[])

  

  useEffect(()=>{
    if(groupsConatinerRef.current){
      const height=groupsConatinerRef.current.scrollHeight;
      groupsConatinerRef.current.style.height=`${height}px`;
    }
  },[groups])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createGroupRef.current && !createGroupRef.current.contains(event.target)) {
        setShowComponent(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleSaveGroup= async (groupData)=>{
    
    try {
      const response = await axios.post('http://localhost:3000/api/group/create', groupData);
      const newGroup = response.data.group;
      setGroups(prevGroups => [...prevGroups, newGroup]);
    } catch (error) {
      console.error('Error saving group:', error);
    }
  }

  const handleGroupClick=(group)=>{
    const newSelectedGroup = {
      ...group,
      groupid: group._id,
    };
    setSelectedGroup(newSelectedGroup);
  }

  const handleClick=()=>{
    setShowComponent(!showComponent);
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.left} `}>
        <h1>Pocket Notes</h1>
        <button onClick={handleClick}>+</button>
        {showComponent && (
          <div ref={createGroupRef}>
            <CreateGroup onSave={handleSaveGroup}/>
          </div>
        )}
        <div className={styles.groupscontainer} ref={groupsConatinerRef}>
          {groups.map((group,index)=>{
            return (
              <div key={index} onClick={()=>{handleGroupClick(group)}}>
                <button className={styles.groupcolor} style={{backgroundColor:group.color}}>{group.name ? group.name.slice(0,2) : 'N/A'}</button>
                <span>{group.name}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className={`${styles.right} `}>
        {selectedGroup && <CreateNotes selectedGroup={selectedGroup}/>}
        {!selectedGroup && (
          <>
            <img className={styles.bg} src={bg} alt="bgimage" />
            <div className={styles.bgcontent}>
              <h1>Pocket Notes</h1>
              <p>Send and receive messages without keeping your phone online.<br/>
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MainPage;
