import { useState } from 'react';
import { Button, FormGroup } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import emailjs from 'emailjs-com';


export const ContactForm = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isMessageSent, setIsMessageSent] = useState(false)
    const [afterSendMessage, setAfterSendMessage] = useState('');

    const sendEmail = async (e) => {
        e.preventDefault();
        const templateParams = {
            subject,
            from_email: email,
            message
        }
        emailjs.send('coronapp', 'contact_form', templateParams)
            .then(response => {
                console.log('Success', response.status, response.text);
                resetFields();
                setAfterSendMessage('Le message a été envoyé !');
                setIsMessageSent(!isMessageSent);
            })
            .catch(err => {
                console.log('Error', err);
                setAfterSendMessage('Service indisponible, veuillez réessayer plus tard.');
                setIsMessageSent(!isMessageSent);
            });
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangeSubject = (e) => {
        setSubject(e.target.value);
    }
    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const resetFields = () => {
        setEmail('');
        setSubject('');
        setMessage('');
    }

    return (
        <>
            <AvForm onValidSubmit={sendEmail} hidden={isMessageSent}>
                <AvField name="email" label="Email" type="email" placeholder="Entrez votre email" value={email} required onChange={handleChangeEmail} />
                <AvField name="subject" label="Sujet" type="text" value={subject} required onChange={handleChangeSubject} />
                <AvField name="emailText" label="Message" type="textarea" value={message} required onChange={handleChangeMessage} />
                <FormGroup>
                    <Button>Envoyer</Button>
                </FormGroup>
            </AvForm>
            <p hidden={!isMessageSent}>{afterSendMessage}</p>
        </>
    )
}