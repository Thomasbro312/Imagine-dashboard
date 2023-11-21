export default {
    // this creates a campaign and pushes it onto the api
    async campaignCreate(context, payload){
        let url = 'http://localhost:8000/api/campaign';

        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                campaign_name: payload.campaign_name,
                client_id: payload.client_id,
                start_date: payload.start_date,
                end_date: payload.end_date
            })
        })
    },
    async editCampaign(context, payload) {
            const response = await fetch(`http://localhost:8000/api/campaign/${payload.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    campaign_name: payload.campaign_name,
                    client_id: payload.client_id,
                    start_date: payload.start_date,
                    end_date: payload.end_date,
                    campaign_phase: payload.campaign_phase,
                })
            })
        if (!response.ok) {
            throw new Error('Edit failed');
        }
    },
}