'use client';

import { useState, useTransition } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { SMTPServer, SendMailResponse } from '@/types';
import { sendMail } from './actions';

const smtpServers: SMTPServer[] = [
    'Gmail',
    '1und1',
    'AOL',
    'DebugMail.io',
    'DynectEmail',
    'FastMail',
    'GandiMail',
    'Godaddy',
    'GodaddyAsia',
    'GodaddyEurope',
    'hot.ee',
    'Hotmail',
    'iCloud',
    'mail.ee',
    'Mail.ru',
    'Mailgun',
    'Mailjet',
    'Mandrill',
    'Naver',
    'Postmark',
    'QQ',
    'QQex',
    'SendCloud',
    'SendGrid',
    'SES',
    'Sparkpost',
    'Yahoo',
    'Yandex',
    'Zoho',
];

const Home = () => {

    const [isSendingMail, startSendingMail] = useTransition();
    const [mailRes, setMailRes] = useState<SendMailResponse>({
        success: false,
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const openAlert = () => setAlertOpen(true);
    const closeAlert = () => setAlertOpen(false);

    const sendMailAction = (payload: FormData) => {
        startSendingMail(async () => {
            const res = await sendMail(payload);
            setMailRes(res);
            openAlert();
        });
    };

    return (
        <Container>
            <Snackbar
                open={alertOpen && !isSendingMail}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={(e, reason) => {
                    if (reason !== 'clickaway') {
                        closeAlert();
                    }
                }}
            >
                <Alert
                    onClose={closeAlert}
                    severity={mailRes.success ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {mailRes.success
                        ? 'Mail sent successfully'
                        : "Couldn't send your mail"}
                </Alert>
            </Snackbar>

            <form action={sendMailAction}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={5}
                    mb={3}
                >
                    <Typography variant="h5">Send a Mail</Typography>

                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={isSendingMail}
                    >
                        Send
                    </Button>
                </Box>

                <Box display="flex" gap={2} mb={2}>
                    <TextField
                        label="From"
                        name="from"
                        type="email"
                        required
                        fullWidth
                    />

                    <TextField
                        label="To"
                        name="to"
                        type="email"
                        required
                        fullWidth
                    />
                </Box>

                <Box display="flex" gap={2} mb={2}>
                    <TextField
                        label="Your Email Password"
                        name="password"
                        type="password"
                        required
                        fullWidth
                    />

                    <FormControl required fullWidth>
                        <InputLabel id="smtpServer">
                            Your SMTP Server
                        </InputLabel>

                        <Select
                            labelId="smtpServer"
                            label="Your SMTP Server"
                            name="smtpServer"
                            defaultValue={smtpServers[0]}
                        >
                            {smtpServers.map((server) => (
                                <MenuItem key={server} value={server}>
                                    {server}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    label="Subject"
                    name="subject"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Body"
                    name="body"
                    multiline
                    minRows={6}
                    maxRows={12}
                    required
                    fullWidth
                />
            </form>

            <Alert
                severity="info"
                variant="filled"
                action={
                    <Button
                        variant="outlined"
                        color="inherit"
                        size="small"
                        component={Link}
                        href="https://myaccount.google.com/lesssecureapps"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ borderRadius: '1rem' }}
                    >
                        Allow
                    </Button>
                }
                sx={{ mt: 2 }}
            >
                Allow less secure apps if you are using gmail.
            </Alert>
        </Container>
    );
};

export default Home;
