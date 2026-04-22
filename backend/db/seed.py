from sqlalchemy import select
from backend.db.connection import async_session_maker
from backend.db.models import Location
from loguru import logger

LOCATIONS = [
    {"name": "Bengaluru", "latitude": 12.9716, "longitude": 77.5946, "timezone": "Asia/Kolkata"},
    {"name": "Delhi", "latitude": 28.6139, "longitude": 77.2090, "timezone": "Asia/Kolkata"},
    {"name": "Mumbai", "latitude": 19.0760, "longitude": 72.8777, "timezone": "Asia/Kolkata"},
    {"name": "Chennai", "latitude": 13.0827, "longitude": 80.2707, "timezone": "Asia/Kolkata"},
    {"name": "Kolkata", "latitude": 22.5726, "longitude": 88.3639, "timezone": "Asia/Kolkata"},
    {"name": "Hyderabad", "latitude": 17.3850, "longitude": 78.4867, "timezone": "Asia/Kolkata"},
    {"name": "Pune", "latitude": 18.5204, "longitude": 73.8567, "timezone": "Asia/Kolkata"},
    {"name": "Ahmedabad", "latitude": 23.0225, "longitude": 72.5714, "timezone": "Asia/Kolkata"},
    {"name": "Jaipur", "latitude": 26.9124, "longitude": 75.7873, "timezone": "Asia/Kolkata"},
    {"name": "Lucknow", "latitude": 26.8467, "longitude": 80.9462, "timezone": "Asia/Kolkata"},
    {"name": "Bhopal", "latitude": 23.2599, "longitude": 77.4126, "timezone": "Asia/Kolkata"},
    {"name": "Patna", "latitude": 25.5941, "longitude": 85.1376, "timezone": "Asia/Kolkata"},
    {"name": "Bhubaneswar", "latitude": 20.2961, "longitude": 85.8245, "timezone": "Asia/Kolkata"},
    {"name": "Raipur", "latitude": 21.2514, "longitude": 81.6296, "timezone": "Asia/Kolkata"},
    {"name": "Ranchi", "latitude": 23.3441, "longitude": 85.3096, "timezone": "Asia/Kolkata"},
    {"name": "Guwahati", "latitude": 26.1445, "longitude": 91.7362, "timezone": "Asia/Kolkata"},
    {"name": "Chandigarh", "latitude": 30.7333, "longitude": 76.7794, "timezone": "Asia/Kolkata"},
    {"name": "Shimla", "latitude": 31.1048, "longitude": 77.1734, "timezone": "Asia/Kolkata"},
    {"name": "Dehradun", "latitude": 30.3165, "longitude": 78.0322, "timezone": "Asia/Kolkata"},
    {"name": "Srinagar", "latitude": 34.0837, "longitude": 74.7973, "timezone": "Asia/Kolkata"},
    {"name": "Jammu", "latitude": 32.7266, "longitude": 74.8570, "timezone": "Asia/Kolkata"},
    {"name": "Amritsar", "latitude": 31.6340, "longitude": 74.8723, "timezone": "Asia/Kolkata"},
    {"name": "Agra", "latitude": 27.1767, "longitude": 78.0081, "timezone": "Asia/Kolkata"},
    {"name": "Varanasi", "latitude": 25.3176, "longitude": 82.9739, "timezone": "Asia/Kolkata"},
    {"name": "Indore", "latitude": 22.7196, "longitude": 75.8577, "timezone": "Asia/Kolkata"},
    {"name": "Nagpur", "latitude": 21.1458, "longitude": 79.0882, "timezone": "Asia/Kolkata"},
    {"name": "Coimbatore", "latitude": 11.0168, "longitude": 76.9558, "timezone": "Asia/Kolkata"},
    {"name": "Visakhapatnam", "latitude": 17.6868, "longitude": 83.2185, "timezone": "Asia/Kolkata"},
    {"name": "Thiruvananthapuram", "latitude": 8.5241, "longitude": 76.9366, "timezone": "Asia/Kolkata"},
    {"name": "Kochi", "latitude": 9.9312, "longitude": 76.2673, "timezone": "Asia/Kolkata"},
    {"name": "Mysuru", "latitude": 12.2958, "longitude": 76.6394, "timezone": "Asia/Kolkata"},
    {"name": "Panaji", "latitude": 15.4909, "longitude": 73.8278, "timezone": "Asia/Kolkata"},
    {"name": "Leh", "latitude": 34.1526, "longitude": 77.5771, "timezone": "Asia/Kolkata"},
    {"name": "Aizawl", "latitude": 23.7271, "longitude": 92.7176, "timezone": "Asia/Kolkata"},
    {"name": "Imphal", "latitude": 24.8170, "longitude": 93.9368, "timezone": "Asia/Kolkata"},
    {"name": "Shillong", "latitude": 25.5788, "longitude": 91.8933, "timezone": "Asia/Kolkata"},
    {"name": "Kohima", "latitude": 25.6751, "longitude": 94.1086, "timezone": "Asia/Kolkata"},
    {"name": "Agartala", "latitude": 23.8315, "longitude": 91.2868, "timezone": "Asia/Kolkata"},
    {"name": "Itanagar", "latitude": 27.0844, "longitude": 93.6053, "timezone": "Asia/Kolkata"},
    {"name": "Gangtok", "latitude": 27.3389, "longitude": 88.6065, "timezone": "Asia/Kolkata"},
    {"name": "Puducherry", "latitude": 11.9416, "longitude": 79.8083, "timezone": "Asia/Kolkata"},
    {"name": "Port Blair", "latitude": 11.6234, "longitude": 92.7265, "timezone": "Asia/Kolkata"},
    {"name": "Kavaratti", "latitude": 10.5626, "longitude": 72.6369, "timezone": "Asia/Kolkata"},
    {"name": "Daman", "latitude": 20.3974, "longitude": 72.8328, "timezone": "Asia/Kolkata"},
    {"name": "Silvassa", "latitude": 20.2736, "longitude": 73.0169, "timezone": "Asia/Kolkata"},
]

async def seed_locations():
    """Seed all Indian cities if they don't exist"""
    async with async_session_maker() as session:
        result = await session.execute(select(Location))
        existing = result.scalars().all()
        
        existing_names = {loc.name for loc in existing}
        
        added_count = 0
        for loc_data in LOCATIONS:
            if loc_data["name"] not in existing_names:
                location = Location(**loc_data)
                session.add(location)
                logger.info(f"Adding location: {loc_data['name']}")
                added_count += 1
        
        if added_count > 0:
            await session.commit()
            logger.info(f"Seeded {added_count} new locations")
        else:
            logger.info(f"All {len(LOCATIONS)} locations already exist")