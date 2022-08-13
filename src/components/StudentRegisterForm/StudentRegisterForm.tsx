import React, {SyntheticEvent, useState} from 'react';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import {labels} from '../../utils/labels';

import './StudentRegisterForm.scss';
import {useParams} from 'react-router-dom';

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
    monthsOfCommercialExp: string | number;
    projectUrls: string[];
    portfolioUrls: string[];
    targetWorkCity: string;
    telephone: string;
    workExperience: string;
}

const StudentRegisterForm = () => {
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
        <section>
            <img className='form-login__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76' />
            {
                errorMessage.length > 0 &&
                <div className='student-register-form_error'>
                    <h2>{errorMessage}</h2>
                </div>
            }
            
            <form onSubmit={handleForm} className='student-register-form'>
                <div className='form__header'>
                    <h2>{labels.studentRegister.label}</h2>
                    <ButtonLink
                        type='button'
                        customClass='filter__header-button blue-btn'
                        label={labels.buttons.clearFilters}
                        // onClick={resetFilterDataHandler}
                    />
                </div>
                <fieldset className='passwords'>
                    <label className='student-register-form__password'>
                        {labels.login.password}
                        <input type='password'
                            placeholder={labels.studentRegister.placeholder.password}
                            value={userData.pwdHash}
                            onChange={e => handleChange('pwdHash', e.target.value)}
                            required
                        />
                    </label>
                    <label className='student-register-form__repeat-password'>
                        {labels.studentRegister.repeatPassword}
                        <input type='password'
                            placeholder={labels.studentRegister.placeholder.password}
                            value={repeatPassword}
                            onChange={e => setRepeatPassword(e.target.value)}
                            required
                        />
                    </label>
                </fieldset>
                <fieldset className='student-register-form__personal-fields'>
                    <div>
                        <label className='student-register-form__firstName'>
                            {labels.studentRegister.name}
                            <input type='text'
                                placeholder={labels.studentRegister.placeholder.name}
                                value={userData.firstName}
                                onChange={e => handleChange('firstName', e.target.value)}
                                required
                            />
                        </label>
                        <label className='student-register-form__lastName'>
                            {labels.studentRegister.surname}
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
                            {labels.studentRegister.telNumber}
                            <input type='tel'
                                placeholder={labels.studentRegister.placeholder.phone}
                                pattern='[0-9]{3}-[0-9]{3}-[0-9]{3}'
                                value={userData.telephone}
                                onChange={e => handleChange('telephone', e.target.value)}
                                required
                            />
                        </label>
                        <label className='student-register-form__targetWorkCity'>
                            {labels.studentRegister.preferedCity}
                            <input type='text'
                                placeholder={labels.studentRegister.placeholder.city}
                                value={userData.targetWorkCity}
                                onChange={e => handleChange('targetWorkCity', e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </fieldset>
                <fieldset className='student-register-form__githubUsername'>
                    <label>
                        {labels.studentRegister.githubNickname}
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
                        {labels.studentRegister.portfolioLink}
                        <input type='text'
                            placeholder={labels.studentRegister.placeholder.links}
                            value={inputPortfolio}
                            onChange={e => setInputPortfolio(e.target.value)}
                            required
                        />
                        <ButtonLink type='button'
                            customClass='blue-btn'
                            label={labels.buttons.add}
                            onClick={() => addUrlToPortfolio(inputPortfolio)}
                        />
                    </label>
                    <label className='student-register-form__projectUrls'>
                        {labels.studentRegister.projectsLink}
                        <input type='text'
                            placeholder={labels.studentRegister.placeholder.links}
                            value={inputProjects}
                            onChange={e => setInputProjects(e.target.value)}
                            required
                        />
                        <ButtonLink type='button'
                            customClass='blue-btn'
                            label={labels.buttons.add}
                            onClick={() => addUrlToProjects(inputProjects)}
                        />
                    </label>
                </fieldset>
                <label className='student-register-form__bio'>
                    {labels.studentRegister.aboutMe}
                    <textarea name='bio'
                        id='bio'
                        cols={30}
                        rows={8}
                        placeholder={labels.studentRegister.placeholder.aboutMe}
                        value={userData.bio}
                        onChange={e => handleChange('bio', e.target.value)}
                        required
                    >
                    </textarea>
                </label>
                <fieldset className='typeWorkAndContract'>
                    <label className='student-register-form__expectedTypeWork'>
                        {labels.studentRegister.prefJobStyle.label}
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
                        {labels.options.contractType.label}
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
                        {labels.options.salary.label}
                        <input type='text'
                            placeholder={labels.options.salary.maxPlaceholder}
                            value={userData.expectedSalary}
                            onChange={e => handleChange('expectedSalary', Number(e.target.value))}
                            required
                        />
                    </label>
                    <label className='student-register-form__monthsOfCommercialExp'>
                        {labels.options.experience}
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
                        {labels.studentRegister.education}
                        <textarea name='education'
                            id='education'
                            cols={30}
                            rows={10}
                            placeholder={labels.studentRegister.placeholder.education}
                            value={userData.education}
                            onChange={e => handleChange('education', e.target.value)}
                            required
                        >
                        </textarea>
                    </label>
                    <label className='student-register-form__workExperience'>
                        {labels.studentRegister.experience}
                        <textarea name='workExperience'
                            id='workExperience'
                            cols={30}
                            rows={10}
                            placeholder={labels.studentRegister.placeholder.experience}
                            value={userData.workExperience}
                            onChange={e => handleChange('workExperience', e.target.value)}
                            required
                        >
                        </textarea>
                    </label>
                    <label className='student-register-form__courses'>
                        {labels.studentRegister.courses}
                        <textarea name='courses'
                            id='courses'
                            cols={30}
                            rows={10}
                            placeholder={labels.studentRegister.placeholder.courses}
                            value={userData.courses}
                            onChange={e => handleChange('courses', e.target.value)}
                            required
                        >
                        </textarea>
                    </label>
                </fieldset>
                <fieldset className='student-register-form__canTakeApprenticeship'>
                    <legend>{labels.options.internship.label}</legend>
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
                {/* <input type='submit' >{labels.buttons.confirm}</input> */}
                <button className='submitStudentRegisterForm btn submit-btn' type='submit'>{labels.buttons.confirm}</button>
            </form>
        </section>
    )
}

export default StudentRegisterForm;