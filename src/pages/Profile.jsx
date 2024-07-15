import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react"
import { cacheApiResponse, getApiCache, getImageURL } from '../utils/API';
import { myDataAtom, userIdAtom } from "../atoms/Persistent";
import { useAtom, useAtomValue } from 'jotai';
import ButtonWrap from "../components/ButtonWrap";
import { MdEdit } from "react-icons/md";
import { loaderRefAtom, modalOpenAtom } from "../atoms/General";
import Modal from "../components/Modal";
import EditSection from "../components/EditSection";
import { AnimatePresence } from 'framer-motion';
import { Avatar } from '@mui/material';

export default function Profile() {
  const userId = useAtomValue(userIdAtom);
  const loaderRef = useAtomValue(loaderRefAtom);
  const [data, setData] = useState(getApiCache('profile'));
  useEffect(() => {
    async function initalize() {
      loaderRef.current.continuousStart();
      const d = await cacheApiResponse('profile', userId);
      if (d != data) setData(d);
      loaderRef.current.complete();
    }
    initalize();
  }, []);
  const PUI = [
    {
      key: 'partner_expectation',
      title: 'Partner Expectation',
      icon: '',
      "fields": [
        { "id": "general", "title": "General" },
        { "id": "height", "title": "Height" },
        { "id": "weight", "title": "Weight" },
        { "id": "marital_status", "title": "Marital Status" },
        { "id": "children_acceptable", "title": "Children Acceptable" },
        { "id": "residence_country_id", "title": "Residence Country" },
        { "id": "religion_id", "title": "Religion" },
        { "id": "caste_id", "title": "Caste" },
        { "id": "sub_caste_id", "title": "Sub Caste" },
        { "id": "education", "title": "Education" },
        { "id": "profession", "title": "Profession" },
        { "id": "smoking_acceptable", "title": "Smoking Acceptable" },
        { "id": "drinking_acceptable", "title": "Drinking Acceptable" },
        { "id": "diet", "title": "Diet" },
        { "id": "body_type", "title": "Body Type" },
        { "id": "personal_value", "title": "Personal Value" },
        { "id": "manglik", "title": "Manglik" },
        { "id": "language", "title": "Language" },
        { "id": "family_value_id", "title": "Family Value" },
        { "id": "preferred_country_id", "title": "Preferred Country" },
        { "id": "preferred_state_id", "title": "Preferred State" },
        { "id": "complexion", "title": "Complexion" }
      ]
    }
  ]
  const UI = [
    {
      key: 'basic_info',
      title: 'Basic Info',
      icon: '',
      fields: [
        { id: 'firs_name', title: 'First Name', },
        { id: 'last_name', title: 'Last Name', },
        { id: 'gender', title: 'Gender', type: 'select', options: ['Male', 'Female'] },
        { id: 'age', title: 'Age', type: 'number' },
        { id: 'no_of_children', title: 'Children', type: 'number' },
        { id: 'date_of_birth', title: 'Date of Birth', type: 'date' },
        { id: 'maritial_status', title: 'Maritial Status', type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'] }
      ]
    },
    {
      key: 'contact_details',
      title: 'Contact Details',
      icon: '',
      fields: [
        { id: 'phone', title: 'Phone' },
        { id: 'email', title: 'Email' }
      ]
    },
    {
      key: 'present_address',
      title: 'Present Address',
      icon: '',
      fields: [
        { id: 'country', title: 'Country' },
        { id: 'state', title: 'State' },
        { id: 'city', title: 'City' },
        { id: 'postalCode', type: 'number', title: 'Postal Code' },
      ]
    },
    {
      key: 'education',
      type: 'array',
      title: 'Education Details',
      icon: '',
      fields: [
        { id: 'degree', title: 'Degree' },
        { id: 'institute', title: 'Institute' },
        { id: 'start', title: 'Start' },
        { id: 'end', title: 'End' },
      ]
    },
    {
      key: 'career',
      type: 'array',
      title: 'Career Details',
      icon: '',
      fields: [
        { id: 'designation', title: 'Designation' },
        { id: 'company', title: 'Company' },
        { id: 'start', title: 'Start' },
        { id: 'end', title: 'End' },
      ]
    },
    {
      key: 'physical_attributes',
      title: 'Physical Attributes',
      icon: '',
      fields: [
        { id: 'height', title: 'Height' },
        { id: 'eye_color', title: 'Eye Color' },
        { id: 'complexion', title: 'Complexion' },
        { id: 'body_type', title: 'Body Type' },
        { id: 'disability', title: 'Disability' },
        { id: 'weight', type: 'number', title: 'Weight' },
        { id: 'hair_color', title: 'Hair Color' },
        { id: 'blood_group', type: 'select', title: 'Blood Group', options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
        { id: 'body_art', title: 'Body Art' },
      ]
    },
    // {
    //   key: 'known_languages',
    //   title: 'Languages',
    //   icon: '',
    //   fields: [
    //     { id: 'mother_tongue',  title: 'Mother Tongue' },
    //     { id: 'known_languages',  title: 'Known Languages' },
    //   ]
    // },
    {
      key: 'hobbies_interest',
      title: 'Hobbies',
      icon: '',
      fields: [
        { id: 'hobbies', title: 'Hobbies' },
        { id: 'music', title: 'Music' },
        { id: 'movies', title: 'Movies' },
        { id: 'sports', title: 'Sports' },
        { id: 'cuisines', title: 'Cuisines' },
        { id: 'interests', title: 'Interests' },
      ]
    },
    {
      key: 'attitude_behavior',
      title: 'Attitude & Behaviour',
      icon: '',
      fields: [
        { id: 'affection', title: 'Affection' },
        { id: 'humor', title: 'Humor' },
        { id: 'political_views', title: 'Political Views' },
        { id: 'religious_service', title: 'Religion Services' },
      ]
    },
    {
      key: 'residence_info',
      title: 'Residence Info',
      icon: '',
      fields: [
        { id: 'birth_country', title: 'Birth Country' },
        { id: 'recidency_country', title: 'Recidency Country' },
        { id: 'growup_country', title: 'Grownup Country' },
        { id: 'immigration_status', title: 'Immigration Status' },
      ]
    },
    {
      key: 'spiritual_backgrounds',
      title: 'Spiritual Backgrounds',
      icon: '',
      fields: [
        { id: 'religion_id', title: 'Religion', type: 'select', options: ['Muslim', 'Hindu', 'Buddhist', 'Christian', 'Sikh', 'Jain', 'Jewish'] },
        { id: 'caste_id', title: 'Caste' },
        { id: 'sub_caste_id', title: 'Sub Caste' },
        { id: 'ethnicity', title: 'Ethnicity' },
        { id: 'personal_value', title: 'Personal Value' },
        { id: 'family_value_id', title: 'Family Value' },
        { id: 'community_value', title: 'Community Value' },
      ]
    },
    {
      key: 'lifestyles',
      title: 'Lifestyles',
      icon: '',
      fields: [
        { id: 'diet', title: 'Diet' },
        { id: 'drink', title: 'Drink' },
        { id: 'smoke', title: 'Smoke' },
        { id: 'living_with', title: 'Living With' },
      ]
    },
    {
      key: 'astrologies',
      title: 'Astrologies',
      icon: '',
      fields: [
        { id: 'sun_sign', title: 'Sun Sign' },
        { id: 'moon_sign', title: 'Moon Sign' },
        { id: 'time_of_birth', title: 'Time of Birth' },
        { id: 'city_of_birth', title: 'City of Birth' },
      ]
    },
    {
      key: 'permanent_address',
      title: 'Permanent Address',
      icon: '',
      fields: [
        { id: 'country', title: 'Country' },
        { id: 'state', title: 'State' },
        { id: 'city', title: 'City' },
        { id: 'postal_code', title: 'Postal Code' },
      ]
    },
    {
      key: 'families_information',
      title: 'Families Information',
      icon: '',
      fields: [
        { id: 'father', title: 'Father' },
        { id: 'mother', title: 'Mother' },
        { id: 'sibling', title: 'Sibling' },
      ]
    }
  ]
  const [isOpen, setIsOpen] = useAtom(modalOpenAtom);
  const [sec, setSec] = useState('');
  const [myData, setMyData] = useAtom(myDataAtom);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="p-8">
      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <EditSection data={data} setData={setData} section={sec} setIsOpen={setIsOpen} />
          </Modal>
        )}
      </AnimatePresence>
      <div className="w-full mb-8 mt-4 flex justify-center">
        <Avatar sx={{ width: 150, height: 150 }} src={getImageURL(myData.photoURL)} />
      </div>
      <div className='flex justify-center mb-4'>
        <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)}>
          <Tab style={{ fontSize: '10px' }} label="Personal Info" />
          <Tab style={{ fontSize: '10px' }} label="Partner Expectation" />
        </Tabs>
      </div>
      <div style={{ display: tabIndex === 0 ? 'block' : 'none' }}>
        {
          UI.map((section, index) =>
            <div key={index} className="mb-10">
              <div className="text-lg mb-2 text-ce">{section.title}</div>
              {
                section.fields.map((field, id) =>
                  <div className="flex mb-2 border-b" key={id} >
                    <div className="w-[30vw] mr-6 text-sm gd-text">{field.title}</div>
                    {
                      field.type === 'select' ?
                        <div className="text-sm">
                          {field.options[parseInt(data?.data?.[section.key]?.[field.id]) - 1]}
                        </div>
                        :
                        <div className="text-sm">{data?.data?.[section.key]?.[field.id]}</div>
                    }
                  </div>
                )
              }
              <ButtonWrap onClick={() => {
                setSec(section)
                setIsOpen(true);
              }} className='flex w-[30vw] mx-auto h-10 mt-6 items-center gd-right rounded-full text-white justify-center gap-2'>
                <div className='text-xl'>
                  <MdEdit />
                </div>
                <div>
                  Edit
                </div>
              </ButtonWrap>
            </div>
          )
        }
      </div>
      <div style={{ display: tabIndex === 1 ? 'block' : 'none' }}>
        {
          PUI.map((section, index) =>
            <div key={index} className="mb-10">
              <div className="text-lg mb-2 text-ce">{section.title}</div>
              {
                section.fields.map((field, id) =>
                  <div className="flex mb-2 border-b" key={id} >
                    <div className="w-[30vw] mr-6 text-sm gd-text">{field.title}</div>
                    <div className="text-sm">{data?.data?.[section.key]?.[field.id]}</div>
                  </div>
                )
              }
              <ButtonWrap onClick={() => {
                setSec(section)
                setIsOpen(true);
              }} className='flex w-[30vw] mx-auto h-10 mt-6 items-center gd-right rounded-full text-white justify-center gap-2'>
                <div className='text-xl'>
                  <MdEdit />
                </div>
                <div>
                  Edit
                </div>
              </ButtonWrap>
            </div>
          )
        }
      </div>
    </div >
  )
}
