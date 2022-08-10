import React, {SyntheticEvent, useState} from 'react';
import {labels} from "../../utils/labels";

import './StudentRegisterForm.scss';
import {useParams} from "react-router-dom";

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
    pwdHash: string;
    bio: string;
    canTakeApprenticeship: boolean;
    courses: string;
    education: string;
    expectedContractType: ContractType;
    expectedSalary: string | number;
    expectedTypeWork: TypeWork;
    firstName: string;
    githubUsername: string;
    lastName: string;
    monthsOfCommercialExp: number;
    projectUrls: string[];
    portfolioUrls: string[];
    targetWorkCity: string;
    telephone: string;
    workExperience: string;
}

export const StudentRegisterForm = () => {
    const {id} = useParams();
    const [userData, setUserData] = useState<CreateStudentResponse>(
        {
            pwdHash: '',
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
            expectedSalary: 0,
            canTakeApprenticeship: true,
            monthsOfCommercialExp: 0,
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
        if (userData.pwdHash !== repeatPassword) {
            setErrorMessage('Wrong password.')
            throw new Error('Wrong password')
        }
        if (userData.pwdHash.length < 6){
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

        console.log(JSON.stringify(["siemanko123"]))

        const res = await fetch(`http://localhost:3001/student/register/${id}`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        console.log(data)
        if (data.isOk){
            window.location.href = `http://localhost:3000/${id}`;
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
        setUserData(prev => ({
            ...prev,
            portfolioUrls: [...prevPortfolioUrlsValue, url]
        }))

        setInputPortfolio('')
    }

    const addUrlToProjects = (url: string) => {
        const prevProjectsUrlsValue = userData.projectUrls;
        setUserData(prev => ({
            ...prev,
            projectUrls: [...prevProjectsUrlsValue, url]
        }))
        setInputProjects('')

    }
    return (
        <>
            {
                errorMessage.length === 0
                ? null
                :
                <div className="student-register-form_error">
                    <h2>{errorMessage}</h2>
                </div>
            }

            <form onSubmit={handleForm} className='student-register-form'>
                <div className="passwords">
                    <label className='student-register-form__password'>
                        <p>Hasło</p>
                        <input type="password" placeholder='Password' value={userData.pwdHash}
                               onChange={e => handleChange('pwdHash', e.target.value)}/>
                    </label>
                    <label className='student-register-form__repeat-password'>
                        <p>Powtórz hasło</p>
                        <input type="password" placeholder='Repeat password' value={repeatPassword}
                               onChange={e => setRepeatPassword(e.target.value)}/>
                    </label>
                </div>
                <div className="student-register-form__personal-fields">
                    <label className='student-register-form__telephone'>
                        Numer telefonu
                        <input type="number" placeholder='Phone number' value={userData.telephone}
                               onChange={e => handleChange('telephone', e.target.value)}/>
                    </label>
                    <label className='student-register-form__firstName'>
                        Imię
                        <input type="text" placeholder='First name' value={userData.firstName}
                               onChange={e => handleChange('firstName', e.target.value)}/>
                    </label>
                    <label className='student-register-form__lastName'>
                        Nazwisko
                        <input type="text" placeholder='Last name' value={userData.lastName}
                               onChange={e => handleChange('lastName', e.target.value)}/>
                    </label>
                    <label className='student-register-form__targetWorkCity'>
                        Preferowane miasto
                        <input type="text" placeholder='City' value={userData.targetWorkCity}
                               onChange={e => handleChange('targetWorkCity', e.target.value)}/>
                    </label>
                </div>
                <div className="student-register-form__githubUsername">
                    <label>
                        Nick na Githubie
                        <input type="text" placeholder='Github username' value={userData.githubUsername}
                               onChange={e => handleChange('githubUsername', e.target.value)}/>
                    </label>
                </div>
                <div className="student-register-form__urls">
                    <label className='student-register-form__portfolioUrls'>
                        Linki do portfolio
                        <input type="text" value={inputPortfolio} onChange={e => setInputPortfolio(e.target.value)}/>
                        <button type='button' onClick={() => addUrlToPortfolio(inputPortfolio)}>Dodaj</button>
                    </label>
                    <label className='student-register-form__projectUrls'>
                        Linki do projektów
                        <input type="text" value={inputProjects} onChange={e => setInputProjects(e.target.value)}/>
                        <button type='button' onClick={() => addUrlToProjects(inputProjects)}>Dodaj</button>
                    </label>
                </div>
                <label className='student-register-form__bio'>
                    Napisz coś o sobie
                    <textarea name="bio" id="bio" cols={30} rows={8} value={userData.bio}
                              onChange={e => handleChange('bio', e.target.value)}></textarea>
                </label>
                <div className="typeWorkAndContract">
                    <label className='student-register-form__expectedTypeWork'>
                        Preferowany sposób pracy
                        <select name="expectedTypeWork" id="expectedTypeWork"
                                onChange={e => handleChange('expectedTypeWork', e.target.value)}>
                            <option value={TypeWork.noPreference}>Każdy</option>
                            <option value={TypeWork.remotely}>Zdalny</option>
                            <option value={TypeWork.stationary}>Stacjonarny</option>
                            <option value={TypeWork.hybrid}>Hybrydowy</option>
                            <option value={TypeWork.readyToMove}>Gotowość do przeprowadzki</option>
                        </select>
                    </label>
                    <label className='student-register-form__expectedContractType'>
                        Preferowany rodzaj umowy
                        <select name="expectedContractType" id="expectedContractType"
                                onChange={e => handleChange('expectedContractType', e.target.value)}>
                            <option value={ContractType.noPreference}>Każdy</option>
                            <option value={ContractType.contractOfEmployment}>Umowa o pracę</option>
                            <option value={ContractType.contractWork}>Umowa o dzieło</option>
                            <option value={ContractType.contractOfMandate}>Umowa zlecenie</option>
                            <option value={ContractType.b2b}>B2B</option>
                        </select>
                    </label>
                </div>
                <div className="salaryAndExp">
                    <label className='student-register-form__expectedSalary'>
                        Spodziewane wynagrodzenie
                        <input type="number" placeholder='Expected salary' value={userData.expectedSalary}
                               onChange={e => handleChange('expectedSalary', Number(e.target.value))}/>
                    </label>
                    <label className='student-register-form__monthsOfCommercialExp'>
                        Miesiące komercyjnego doświadczenia
                        <input type="number" placeholder='Months of commercial experience'
                               value={userData.monthsOfCommercialExp}
                               onChange={e => handleChange('monthsOfCommercialExp', Number(e.target.value))}/>
                    </label>
                </div>
                <div className="educationWorkExperienceCourses">
                    <label className='student-register-form__education'>
                        Edukacja
                        <textarea name="education" id="education" cols={30} rows={10} value={userData.education}
                                  onChange={e => handleChange('education', e.target.value)}></textarea>
                    </label>
                    <label className='student-register-form__workExperience'>
                        Doświadczenie zawodowe
                        <textarea name="workExperience" id="workExperience" cols={30} rows={10}
                                  value={userData.workExperience}
                                  onChange={e => handleChange('workExperience', e.target.value)}></textarea>
                    </label>
                    <label className='student-register-form__courses'>
                        Kursy i certyfikaty
                        <textarea name="courses" id="courses" cols={30} rows={10} value={userData.courses}
                                  onChange={e => handleChange('courses', e.target.value)}></textarea>
                    </label>
                </div>
                <div className='internship-wrap'>
                    <fieldset className='student-register-form__canTakeApprenticeship'>
                        <legend>{labels.options.internship.label}</legend>
                        <div className="student-register-form__canTakeApprenticeship__agree">
                            <input type="radio" name='internship' id='yes'
                                   value={1}
                                   onChange={e => handleChange('canTakeApprenticeship', Boolean(Number(e.target.value)))}
                                   checked={userData.canTakeApprenticeship}/>
                            <label className='yes-label-internship' htmlFor="yes">Tak</label>
                        </div>
                        <div className="student-register-form__canTakeApprenticeship__disagree">
                            <input type="radio" name='internship' id='no'
                                   value={0}
                                   onChange={e => handleChange('canTakeApprenticeship', Boolean(Number(e.target.value)))}
                                   checked={!userData.canTakeApprenticeship}/>
                            <label className='no-label-internship' htmlFor="no">Nie</label>
                        </div>
                    </fieldset>
                </div>
                <button className='submitStudentRegisterForm' type='submit'>Zatwierdź</button>

            </form>
        </>
    )
}