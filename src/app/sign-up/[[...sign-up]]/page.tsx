import { SignUp } from '@clerk/nextjs'
import { Box, Typography, AppBar, Toolbar, Button } from '@mui/material'

export default function SignInPage() {
    return (
        <div className="min-h-screen full-width bg-themeRed">
            <Box>
                <AppBar 
                    position="static"
                    sx={{
                        width: '100vw',
                        backgroundColor: '#62C4E1',
                        left: 0,
                        top: 0
                    }}
                    className="bg-themeCopper"
                >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Button color='inherit' href="/" sx={{textTransform: 'none'}}>
                                <Typography 
                                    variant="h5" 
                                    style={{flexGrow: 1}} 
                                    sx={{
                                        letterSpacing: 1,
                                    }}
                                >
                                    All Thyme
                                </Typography>
                            </Button>
                        </Box>
                        <Box>
                            <Button color='inherit' href="/sign-in">Sign In</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{textAlign: 'center', my: 4}}
                    className="text-themeCream"
                >
                    <Typography 
                        variant="h1" 
                        gutterBottom
                        sx={{
                            fontSize: '5rem',
                        }}
                    >
                        Sign Up
                    </Typography>
                    <SignUp />
                </Box>
            </Box>
        </div>
    )
}