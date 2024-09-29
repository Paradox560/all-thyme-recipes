import { Grid, Box, Card, CardMedia, Typography, Button, CardContent } from "@mui/material";

const teamMembers = [
    {
        name: 'Amogh Gurram',
        title: 'UI/UX Designer and Frontend Developer',
        description: 'University of Maryland, College Park',
        linkName: 'LinkedIn',
        professionalLink: 'https://www.linkedin.com/in/amogh-gurram',
        imgUrl: "https://media.licdn.com/dms/image/v2/D4E03AQH8tC0-iDLO9g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1695595796177?e=1732752000&v=beta&t=Y_Hi9ebYeluH9w60Slc4Ov7ABNahrJfhvzsDDx8nXL8",
    },
    {
        name: 'Jayant Kammula',
        title: 'Backend Developer',
        description: 'University of Maryland, College Park',
        linkName: 'LinkedIn',
        professionalLink: 'https://www.linkedin.com/in/jayantkammula',
        imgUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQEI65bI9wJpSw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696780295681?e=1732752000&v=beta&t=YyJBR2BLpdQAHdAOUqkMk40SrRw8KUefOX_1paoN-Wc',
    },
    {
        name: 'Pranav Palle',
        title: 'Full Stack Developer and Project Manager',
        description: 'University of Maryland, College Park',
        linkName: 'Personal Website',
        professionalLink: 'https://pranavpalle.netlify.app',
        imgUrl: 'https://media.licdn.com/dms/image/v2/D5603AQEeBxxRkZL8Uw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1695523201341?e=1729728000&v=beta&t=6dL2Hpz-LRMAyeOr9q82Q5t3p7cN8io4m8_ttSGBJlw',
    },
    {
        name: 'Shivank Bhimavarapu',
        title: 'UI/UX Designer and Frontend Developer',
        description: 'University of Maryland, College Park',
        linkName: 'Personal Website',
        professionalLink: 'https://sbhima.github.io/shivank-portfolio',
        imgUrl: 'https://media.licdn.com/dms/image/v2/D5603AQGK60dYjowOLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712861852099?e=1732752000&v=beta&t=PunUS-BOFCiT6eCYIijYfrfRn7xXXrvmsLgGUscigrE'
    },
];

export default function Contact() {
    return (
    <Box
        width="100vw"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}
    >
        <Box sx={{ padding: 3 }} width="100vw"></Box>
        <Typography 
            variant="h1" 
            gutterBottom
            sx={{
                fontSize: '5rem',
            }}
            >
            Meet The Team
        </Typography>
        <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            alt={member.name}
                            image={member.imgUrl} 
                            sx={{ borderRadius: '4px 4px 0 0' }}
                        />
                        <CardContent>
                            <Typography variant="h5">{member.name}</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                {member.title}
                            </Typography>
                            <Typography variant="body2">{member.description}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                                href={member.professionalLink}
                                target="_blank"
                            >
                                {member.linkName}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>)
}