import React, { SyntheticEvent, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import labels from 'utils/labels.json'

import './StudentRegisterForm.scss';
import { apiUrl } from '../../config/api';


enum TypeWork {
    stationary = 'stationary',
    readyToMove = 'readyToMove',
    remotely = 'remotely',
    hybrid = 'hybrid',
    noPreference = 'noPreference',
}

enum ContractType {
    contractOfEmployment = 'contractOfEmployment',
    b2b = 'b2b',
    contractOfMandate = 'contractOfMandate',
    contractWork = 'contractWork',
    noPreference = 'noPreference',
}

interface CreateStudentResponse {
    id: string;
    registerToken: string;
    pwd: string;
    bio: string;
    canTakeApprenticeship: boolean | '';
    courses: string;
    education: string;
    expectedContractType: ContractType;
    expectedSalary: string | number;
    expectedTypeWork: TypeWork;
    firstName: string;
    githubUsername: string;
    lastName: string;
    monthsOfCommercialExp: string | number;
    projectUrls: string[];
    portfolioUrls: string[];
    targetWorkCity: string;
    telephone: string;
    workExperience: string;
}

const StudentRegisterForm = () => {
    const { id, token } = useParams();
    const { pathname } = useLocation();
    const [userData, setUserData] = useState<CreateStudentResponse>(
        {
            id: id as string,
            registerToken: token as string,
            pwd: '',
            telephone: '',
            firstName: '', //nie puste
            lastName: '', //nie puste
            githubUsername: '',
            portfolioUrls: [],
            projectUrls: [],
            bio: '',
            expectedTypeWork: TypeWork.noPreference,
            targetWorkCity: '',
            expectedContractType: ContractType.noPreference,
            expectedSalary: '',
            canTakeApprenticeship: true,
            monthsOfCommercialExp: '',
            education: '', //długi test, zachowujemy entery
            workExperience: '', //długi test, zachowujemy entery
            courses: '' //długi test, zachowujemy entery
        }
    )

    const [inputPortfolio, setInputPortfolio] = useState<string>('')
    const [inputProjects, setInputProjects] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('')

    const handleForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        // walidacja
        if (userData.pwd !== repeatPassword) {
            setErrorMessage('Wrong password.')
            throw new Error('Wrong password')
        }
        if (userData.pwd.length < 6){
            setErrorMessage('Password should have atleast 6 characters.')
            throw new Error('Password should have atleast 6 characters.')
        }
        if (userData.telephone.length !== 9){
            setErrorMessage('Telephone number should have 9 characters.')
            throw new Error('Wrong number.')
        }
        if (userData.firstName.length === 0 || userData.lastName.length === 0 ){
            setErrorMessage('Pola Imię i Nazwisko są wymagane.')
            throw new Error('No required fields')
        }

        const res = await fetch(`${apiUrl}/student/`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })

        const data = await res.json()
        if (data.success){
            // window.location.href = `http://localhost:3000/`;
            window.location.href = `https://megakheadhunters-team20.networkmanager.pl/`

        } else {
            throw new Error('Something went wrong. Try again later.')
        }
    }

    const handleChange = (key: string, value: any) => {
        setUserData(dataItem => ({
            ...dataItem,
            [key]: value
        }))
    }

    const addUrlToPortfolio = (url: string) => {
        const prevPortfolioUrlsValue = userData.portfolioUrls;
        url &&
            (setUserData(prev => ({
                ...prev,
                portfolioUrls: [...prevPortfolioUrlsValue, url]
            }))
        )
        setInputPortfolio('')
    }

    const addUrlToProjects = (url: string) => {
        const prevProjectsUrlsValue = userData.projectUrls;
        url &&
            (setUserData(prev => ({
                ...prev,
                projectUrls: [...prevProjectsUrlsValue, url]
            }))
        )
        setInputProjects('')
    }

    const deleteUrlHandler = (field: string, arr: string[], url: string) => {
        const newData = arr.filter((item: string) => item !== url)
        setUserData(prev => ({
            ...prev,
            [field]: newData
        }))
    }

    const urlListHandler = (field: string, arr: string[]) => {
        return arr.map((url, i) =>
            <span key={`url-${i}`}>
                <span>{url}</span>
                <ButtonLink type='button'
                    customClass='red-btn'
                    label='x'
                    onClick={() => deleteUrlHandler(field, arr, url)}
                />
            </span> 
        )
    }

    const resetFormHandler = () => {
        setUserData(
            {
                id: id as string,
                registerToken: token as string,
                pwd: '',
                telephone: '',
                firstName: '',
                lastName: '',
                githubUsername: '',
                portfolioUrls: [],
                projectUrls: [],
                bio: '',
                expectedTypeWork: TypeWork.noPreference,
                targetWorkCity: '',
                expectedContractType: ContractType.noPreference,
                expectedSalary: '',
                canTakeApprenticeship: true,
                monthsOfCommercialExp: '',
                education: '',
                workExperience: '',
                courses: '',
            }
        )
    }


    return (
        <section className='registration-form'>
            <img className='form-login__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76' />
            {
                errorMessage.length > 0 &&
                <div className='student-register-form_error'>
                    <h2>{errorMessage}</h2>
                </div>
            }
            
            <form onSubmit={handleForm} className='student-register-form'>
                <div className='form__header'>
                { pathname.includes('register') ?
                    <h2>{labels.studentRegister.label}</h2>
                    :
                    <h2>{labels.candidate.edit}</h2>
                }
                { pathname.includes('register') ?
                    <ButtonLink
                        type='button'
                        customClass='filter__header-button blue-btn'
                        label={labels.buttons.clearFilters}
                        onClick={resetFormHandler}
                    />
                    :
                    <ButtonLink
                        customClass='filter__header-button blue-btn'
                        label={labels.candidate.backToProfile}
                        target={`/student/${id}`}
                    />
                }
                    
                </div>

                { pathname.includes('register') &&
                    <fieldset className='passwords'>
                        <label className='student-register-form__password'>
                            <span>{labels.form.password}<span> *</span></span>
                            <input type='password'
                                placeholder={labels.studentRegister.placeholder.password}
                                value={userData.pwd}
                                onChange={e => handleChange('pwd', e.target.value)}
                                required
                            />
                        </label>
                        <label className='student-register-form__repeat-password'>
                            <span>{labels.studentRegister.repeatPassword}<span> *</span></span>
                            <input type='password'
                                placeholder={labels.studentRegister.placeholder.password}
                                value={repeatPassword}
                                onChange={e => setRepeatPassword(e.target.value)}
                                required
                            />
                        </label>
                    </fieldset>
                }
                
                <fieldset className='student-register-form__personal-fields'>
                    <div>
                        <label className='student-register-form__firstName'>
                            <span>{labels.studentRegister.name}<span> *</span></span>
                            <input type='text'
                                placeholder={labels.studentRegister.placeholder.name}
                                value={userData.firstName}
                                onChange={e => handleChange('firstName', e.target.value)}
                                required
                            />
                        </label>
                        <label className='student-register-form__lastName'>
                            <span>{labels.studentRegister.surname}<span> *</span></span>
                            <input type='text'
                                placeholder={labels.studentRegister.placeholder.surname}
                                value={userData.lastName}
                                onChange={e => handleChange('lastName', e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className='student-register-form__telephone'>
                            <span>{labels.studentRegister.telNumber}</span>
                            <input type='tel'
                                placeholder={labels.studentRegister.placeholder.phone}
                                pattern='[0-9]{9}'
                                value={userData.telephone}
                                onChange={e => handleChange('telephone', e.target.value)}
                            />
                        </label>
                        <label className='student-register-form__targetWorkCity'>
                            <span>{labels.studentRegister.preferedCity}</span>
                            <input type='text'
                                placeholder={labels.studentRegister.placeholder.city}
                                value={userData.targetWorkCity}
                                onChange={e => handleChange('targetWorkCity', e.target.value)}
                            />
                        </label>
                    </div>
                </fieldset>
                <fieldset className='student-register-form__githubUsername'>
                    <label>
                        <span>{labels.studentRegister.githubNickname}<span> *</span></span>
                        <input type='text'
                            placeholder={labels.studentRegister.placeholder.githubNickname}
                            value={userData.githubUsername}
                            onChange={e => handleChange('githubUsername', e.target.value)}
                            required
                        />
                    </label>
                </fieldset>
                <fieldset className='student-register-form__urls'>
                    <label className='student-register-form__portfolioUrls'>
                        <span>{labels.studentRegister.portfolioLink}</span>
                        {
                            userData?.projectUrls && 
                            <div className='urls'>
                                {urlListHandler('portfolioUrls', userData.portfolioUrls)}
                            </div>
                        }
                        <input type='text'
                            placeholder={labels.studentRegister.placeholder.links}
                            value={inputPortfolio}
                            onChange={e => setInputPortfolio(e.target.value)}
                        />
                        <ButtonLink type='button'
                            customClass='blue-btn'
                            label={labels.buttons.add}
                            onClick={() => addUrlToPortfolio(inputPortfolio)}
                        />
                    </label>
                    <label className='student-register-form__projectUrls'>
                        <span>{labels.studentRegister.projectsLink}<span></span></span>
                        {
                            userData?.projectUrls && 
                            <div className='urls'>
                                {urlListHandler('projectUrls', userData.projectUrls)}
                            </div>
                        }
                        <input type='text'
                            placeholder={labels.studentRegister.placeholder.links}
                            value={inputProjects}
                            onChange={e => setInputProjects(e.target.value)}
                        />
                        <ButtonLink type='button'
                            customClass='blue-btn'
                            label={labels.buttons.add}
                            onClick={() => addUrlToProjects(inputProjects)}
                        />
                    </label>
                </fieldset>
                <label className='student-register-form__bio'>
                    <span>{labels.studentRegister.aboutMe}</span>
                    <textarea name='bio'
                        id='bio'
                        cols={30}
                        rows={8}
                        placeholder={labels.studentRegister.placeholder.aboutMe}
                        value={userData.bio}
                        onChange={e => handleChange('bio', e.target.value)}
                    >
                    </textarea>
                </label>
                <fieldset className='typeWorkAndContract'>
                    <label className='student-register-form__expectedTypeWork'>
                        <span>{labels.studentRegister.prefJobStyle.label}<span> *</span></span>
                        <select name='expectedTypeWork'
                            id='expectedTypeWork'
                            onChange={e => handleChange('expectedTypeWork', e.target.value)}
                            required
                            >
                            <option value={TypeWork.noPreference}>
                                {labels.studentRegister.prefJobStyle.all}
                            </option>
                            <option value={TypeWork.remotely}>
                                {labels.studentRegister.prefJobStyle.remote}
                            </option>
                            <option value={TypeWork.stationary}>
                                {labels.studentRegister.prefJobStyle.office}
                            </option>
                            <option value={TypeWork.hybrid}>
                                {labels.studentRegister.prefJobStyle.hybrid}
                            </option>
                            <option value={TypeWork.readyToMove}>
                                {labels.studentRegister.prefJobStyle.relocation}
                            </option>
                        </select>
                    </label>
                    <label className='student-register-form__expectedContractType'>
                        <span>{labels.options.contractType.label}<span> *</span></span>
                        <select name='expectedContractType'
                            id='expectedContractType'
                            onChange={e => handleChange('expectedContractType', e.target.value)}
                            required
                            >
                            <option value={ContractType.noPreference}>
                                {labels.options.contractType.all}
                            </option>
                            <option value={ContractType.contractOfEmployment}>
                                {labels.options.contractType.permContract}
                            </option>
                            <option value={ContractType.contractWork}>
                                {labels.options.contractType.projectContract}
                            </option>
                            <option value={ContractType.contractOfMandate}>
                                {labels.options.contractType.tempContract}
                            </option>
                            <option value={ContractType.b2b}>
                                {labels.options.contractType.b2b}
                            </option>
                        </select>
                    </label>
                </fieldset>
                <fieldset className='salaryAndExp'>
                    <label className='student-register-form__expectedSalary'>
                        <span>{labels.options.salary.label}</span>
                        <input type='text'
                            placeholder={labels.options.salary.maxPlaceholder}
                            value={userData.expectedSalary}
                            onChange={e => handleChange('expectedSalary', Number(e.target.value))}
                        />
                    </label>
                    <label className='student-register-form__monthsOfCommercialExp'>
                        <span>{labels.options.experience}<span> *</span></span>
                        <input type='number'
                            placeholder={labels.studentRegister.placeholder.months}
                            value={userData.monthsOfCommercialExp}
                            onChange={e => handleChange('monthsOfCommercialExp', Number(e.target.value))}
                            required
                        />
                    </label>
                </fieldset>
                <fieldset className='educationWorkExperienceCourses'>
                    <label className='student-register-form__education'>
                        <span>{labels.studentRegister.education}</span>
                        <textarea name='education'
                            id='education'
                            cols={30}
                            rows={10}
                            placeholder={labels.studentRegister.placeholder.education}
                            value={userData.education}
                            onChange={e => handleChange('education', e.target.value)}
                        >
                        </textarea>
                    </label>
                    <label className='student-register-form__workExperience'>
                        <span>{labels.studentRegister.experience}</span>
                        <textarea name='workExperience'
                            id='workExperience'
                            cols={30}
                            rows={10}
                            placeholder={labels.studentRegister.placeholder.experience}
                            value={userData.workExperience}
                            onChange={e => handleChange('workExperience', e.target.value)}
                        >
                        </textarea>
                    </label>
                    <label className='student-register-form__courses'>
                        <span>{labels.studentRegister.courses}</span>
                        <textarea name='courses'
                            id='courses'
                            cols={30}
                            rows={10}
                            placeholder={labels.studentRegister.placeholder.courses}
                            value={userData.courses}
                            onChange={e => handleChange('courses', e.target.value)}
                        >
                        </textarea>
                    </label>
                </fieldset>
                <fieldset className='student-register-form__canTakeApprenticeship'>
                    <legend>{labels.options.internship.label}<span> *</span></legend>
                    <div className='student-register-form__canTakeApprenticeship__agree'>
                        <input type='radio'
                            name='internship'
                            id='yes'
                            value={1}
                            onChange={e => handleChange('canTakeApprenticeship', Boolean(Number(e.target.value)))}
                            required
                        />
                        <label className='yes-label-internship' htmlFor='yes'>
                            {labels.options.internship.yes}
                        </label>
                    </div>
                    <div className='student-register-form__canTakeApprenticeship__disagree'>
                        <input type='radio'
                            name='internship' id='no'
                            value={0}
                            onChange={e => handleChange('canTakeApprenticeship', Boolean(Number(e.target.value)))}
                            required
                        />
                        <label className='no-label-internship' htmlFor='no'>
                            {labels.options.internship.no}
                        </label>
                    </div>
                </fieldset>
                <button className='red-btn submit-btn' type='submit'>{labels.buttons.confirm}</button>
            </form>
        </section>
    )
}

export default StudentRegisterForm;