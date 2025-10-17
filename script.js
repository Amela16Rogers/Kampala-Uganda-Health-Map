// Initialize the map with Kampala coordinates
const KAMPALA_CENTER = [0.3476, 32.5825];
const DEFAULT_ZOOM = 12;

const map = L.map('map').setView(KAMPALA_CENTER, DEFAULT_ZOOM);

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add scale control
L.control.scale({
    imperial: false, // Disable miles/feet
    metric: true,    // Enable kilometers/meters
    position: 'bottomleft', // Position on the map
    maxWidth: 200,   // Maximum width of the scale control
    updateWhenIdle: true // Update scale only when pan/zoom ends
}).addTo(map);

// Organized Health Centers Data by Type and Location
const healthCenters = [
    // ==================== NATIONAL REFERRAL HOSPITALS ====================
    {
        name: "Mulago National Referral Hospital",
        type: "National Referral Hospital",
        lat: 0.3476,
        lng: 32.5825,
        contact: "+256-414-532-000",
        emergency: "+256-414-532-001",
        services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics", "ICU"],
        description: "Uganda's largest public hospital and main teaching hospital",
        address: "Mulago Hill Road, Kampala",
        hours: "24/7 Emergency Services",
        level: "National Referral"
    },

    // ==================== PRIVATE SPECIALIZED HOSPITALS ====================
    {
        name: "International Hospital Kampala (IHK)",
        type: "Private Specialized Hospital",
        lat: 0.3174,
        lng: 32.6089,
        contact: "+256-414-342-000",
        emergency: "+256-414-342-111",
        services: ["Cardiology", "Oncology", "Orthopedics", "Neurology", "ICU"],
        description: "Leading multi-specialty private hospital with advanced medical equipment",
        address: "Plot 4686, Namuwongo Road, Kampala",
        hours: "24/7",
        level: "Tertiary Care",
        website: "https://www.ihk.co.ug"
    },

    // ==================== PRIVATE HOSPITALS ====================
    {
        name: "Kampala Hospital",
        type: "Private Hospital",
        lat: 0.3224,
        lng: 32.5856,
        contact: "+256-414-289-600",
        emergency: "+256-414-289-601",
        services: ["General Medicine", "Surgery", "Maternity", "Laboratory", "Pharmacy"],
        description: "Modern private healthcare facility offering comprehensive medical services",
        address: "Plot 4-6, Acacia Avenue, Kololo, Kampala",
        hours: "24/7",
        level: "Tertiary Care"
    },

    // ==================== GENERAL HOSPITALS ====================
    {
        name: "Nsambya Hospital",
        type: "General Hospital",
        lat: 0.2856,
        lng: 32.5878,
        contact: "+256-414-267-011",
        emergency: "+256-414-267-500",
        services: ["General Practice", "Surgery", "Pediatrics", "Maternity", "Dental"],
        description: "St. Francis Hospital Nsambya - Faith-based hospital serving the community",
        address: "Nsambya Road, Kampala",
        hours: "24/7 Emergency",
        level: "Regional Referral"
    },
    {
        name: "Rubaga Hospital",
        type: "General Hospital",
        lat: 0.3067,
        lng: 32.5522,
        contact: "+256-414-270-267",
        emergency: "+256-414-270-268",
        services: ["General Medicine", "Surgery", "Maternity", "Pediatrics", "Laboratory"],
        description: "Private not-for-profit hospital run by the Catholic Church",
        address: "Rubaga Hill, Kampala",
        hours: "24/7 Emergency",
        level: "Regional Referral"
    },
    {
        name: "Mengo Hospital",
        type: "General Hospital",
        lat: 0.2950,
        lng: 32.5658,
        contact: "+256-414-274-891",
        emergency: "+256-414-274-892",
        services: ["General Practice", "Maternity", "Surgery", "Pharmacy", "Laboratory"],
        description: "Oldest hospital in Uganda, established in 1897",
        address: "Mengo Hill Road, Kampala",
        hours: "24/7 Emergency",
        level: "Regional Referral"
    },
    {
        name: "Kawempe General Hospital",
        type: "General Hospital",
        lat: 0.3789,
        lng: 32.5678,
        contact: "+256-414-234-567",
        emergency: "+256-414-234-568",
        services: ["General Medicine", "Maternity", "Pediatrics", "Laboratory", "Pharmacy"],
        description: "Public hospital serving Kawempe division and surrounding areas",
        address: "Kawempe Division, Kampala",
        hours: "24/7",
        level: "General Hospital"
    },

    // ==================== HEALTH CENTERS ====================
    {
        name: "Kisenyi Health Center IV",
        type: "Health Center IV",
        lat: 0.3158,
        lng: 32.5723,
        contact: "+256-414-235-678",
        emergency: "+256-414-235-679",
        services: ["Outpatient Care", "Maternity", "Immunization", "Laboratory", "Pharmacy"],
        description: "Public health center serving Kisenyi and central Kampala area",
        address: "Kisenyi, Central Division, Kampala",
        hours: "7:00 AM - 9:00 PM",
        level: "Health Center IV"
    },
    {
        name: "Kiswa Health Center",
        type: "Health Center III",
        lat: 0.2987,
        lng: 32.6123,
        contact: "+256-414-567-890",
        services: ["Basic Healthcare", "Immunization", "Prenatal Care", "HIV Testing"],
        description: "Community health center serving Kiswa and surrounding neighborhoods",
        address: "Kiswa, Nakawa Division, Kampala",
        hours: "8:00 AM - 6:00 PM",
        level: "Health Center III"
    }
];

// Custom icons for different health center types
const iconTypes = {
    "National Referral Hospital": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "Private Specialized Hospital": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "Private Hospital": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "General Hospital": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "Health Center IV": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "Health Center III": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
};

// Default icon
const defaultIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Add markers to map
const markers = [];
healthCenters.forEach(center => {
    const icon = iconTypes[center.type] || defaultIcon;
    
    const marker = L.marker([center.lat, center.lng], { icon: icon })
        .addTo(map)
        .bindPopup(`
            <div class="health-popup">
                <h3>${center.name}</h3>
                <div class="popup-section">
                    <h4>📋 Basic Information</h4>
                    <p><strong>Type:</strong> ${center.type}</p>
                    <p><strong>Level:</strong> ${center.level}</p>
                    <p><strong>Address:</strong> ${center.address}</p>
                </div>
                
                <div class="popup-section">
                    <h4>📞 Contact Information</h4>
                    <p><strong>Main Contact:</strong> ${center.contact}</p>
                    ${center.emergency ? `<p><strong>Emergency:</strong> ${center.emergency}</p>` : ''}
                    ${center.website ? `<p><strong>Website:</strong> <a href="${center.website}" target="_blank">${center.website}</a></p>` : ''}
                </div>
                
                <div class="popup-section">
                    <h4>🕒 Operating Hours</h4>
                    <p>${center.hours}</p>
                </div>
                
                <div class="popup-section">
                    <h4>🏥 Services Offered</h4>
                    <div class="services-list">
                        ${center.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                    </div>
                </div>
                
                <div class="popup-section">
                    <h4>ℹ️ Description</h4>
                    <p>${center.description}</p>
                </div>
            </div>
        `);
    
    markers.push({
        marker: marker,
        data: center
    });
});

// Search functionality
document.getElementById('searchBtn').addEventListener('click', searchHealthCenters);
document.getElementById('searchBox').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchHealthCenters();
    }
});

function searchHealthCenters() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase().trim();
    
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }
    
    const foundCenters = healthCenters.filter(center => 
        center.name.toLowerCase().includes(searchTerm) ||
        center.type.toLowerCase().includes(searchTerm) ||
        center.services.some(service => service.toLowerCase().includes(searchTerm))
    );
    
    if (foundCenters.length === 0) {
        alert('No health centers found with that name, type, or service');
        return;
    }
    
    // Close all popups
    markers.forEach(m => m.marker.closePopup());
    
    // Focus on first found center
    const firstCenter = foundCenters[0];
    map.setView([firstCenter.lat, firstCenter.lng], 14);
    
    // Find and open the marker popup
    const foundMarker = markers.find(m => 
        m.data.name === firstCenter.name
    );
    
    if (foundMarker) {
        foundMarker.marker.openPopup();
    }
}

// Current location functionality
document.getElementById('currentLocationBtn').addEventListener('click', getCurrentLocation);

let userLocationMarker = null;

function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }
    
    // Show loading state
    const locationBtn = document.getElementById('currentLocationBtn');
    const originalText = locationBtn.textContent;
    locationBtn.textContent = '📍 Locating...';
    locationBtn.disabled = true;
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // Remove existing user location marker
            if (userLocationMarker) {
                map.removeLayer(userLocationMarker);
            }
            
            // Add new marker for user location
            userLocationMarker = L.marker([lat, lng])
                .addTo(map)
                .bindPopup('Your current location')
                .openPopup();
            
            // Center map on user location
            map.setView([lat, lng], 14);
            
            // Restore button state
            locationBtn.textContent = originalText;
            locationBtn.disabled = false;
        },
        function(error) {
            let errorMessage = 'Unable to retrieve your location: ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Location access was denied.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Location request timed out.';
                    break;
                default:
                    errorMessage += 'An unknown error occurred.';
                    break;
            }
            alert(errorMessage);
            
            // Restore button state
            locationBtn.textContent = originalText;
            locationBtn.disabled = false;
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 60000
        }
    );
}

// Reset view functionality
document.getElementById('resetViewBtn').addEventListener('click', resetMapView);

function resetMapView() {
    // Reset to Kampala center and default zoom
    map.setView(KAMPALA_CENTER, DEFAULT_ZOOM);
    
    // Close all popups
    markers.forEach(m => m.marker.closePopup());
    
    // Clear search box
    document.getElementById('searchBox').value = '';
    
    // Remove user location marker if exists
    if (userLocationMarker) {
        map.removeLayer(userLocationMarker);
        userLocationMarker = null;
    }
    
    // Show all markers (in case any were hidden)
    markers.forEach(m => {
        if (!map.hasLayer(m.marker)) {
            map.addLayer(m.marker);
        }
    });
}

// Populate health centers list with organized categories
function populateHealthCentersList() {
    const listContainer = document.getElementById('healthCentersList');
    listContainer.innerHTML = '';
    
    // Group health centers by type
    const centersByType = {};
    healthCenters.forEach(center => {
        if (!centersByType[center.type]) {
            centersByType[center.type] = [];
        }
        centersByType[center.type].push(center);
    });
    
    // Create sections for each type
    Object.keys(centersByType).forEach(type => {
        const typeSection = document.createElement('div');
        typeSection.className = 'health-center-type-section';
        typeSection.innerHTML = `<h4 class="type-header">${type}</h4>`;
        
        centersByType[type].forEach(center => {
            const centerElement = document.createElement('div');
            centerElement.className = 'health-center-item';
            centerElement.innerHTML = `
                <div class="center-header">
                    <h5>${center.name}</h5>
                    <span class="level-badge">${center.level}</span>
                </div>
                <p class="center-address">📍 ${center.address}</p>
                <p class="center-contact">📞 ${center.contact}</p>
                <div class="center-services">
                    ${center.services.slice(0, 3).map(service => `<span class="service-pill">${service}</span>`).join('')}
                    ${center.services.length > 3 ? `<span class="more-services">+${center.services.length - 3} more</span>` : ''}
                </div>
                <p class="center-hours">🕒 ${center.hours}</p>
            `;
            
            centerElement.addEventListener('click', function() {
                map.setView([center.lat, center.lng], 16);
                const marker = markers.find(m => m.data.name === center.name);
                if (marker) {
                    marker.marker.openPopup();
                }
            });
            
            typeSection.appendChild(centerElement);
        });
        
        listContainer.appendChild(typeSection);
    });
}

// Initialize the health centers list
populateHealthCentersList();

// Filter functionality by type
function addFilterButtons() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <h4>Filter by Type:</h4>
        <div class="filter-buttons">
            <button class="filter-btn active" data-type="all">All Facilities</button>
            <button class="filter-btn" data-type="National Referral Hospital">Referral Hospitals</button>
            <button class="filter-btn" data-type="Private Specialized Hospital">Specialized</button>
            <button class="filter-btn" data-type="Private Hospital">Private</button>
            <button class="filter-btn" data-type="General Hospital">General</button>
            <button class="filter-btn" data-type="Health Center">Health Centers</button>
        </div>
    `;
    
    const infoPanel = document.querySelector('.info-panel');
    infoPanel.insertBefore(filterContainer, document.getElementById('healthCentersList'));
    
    // Add filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter markers
            markers.forEach(m => {
                if (type === 'all' || m.data.type.includes(type) || (type === 'Health Center' && m.data.type.includes('Health Center'))) {
                    if (!map.hasLayer(m.marker)) {
                        map.addLayer(m.marker);
                    }
                } else {
                    if (map.hasLayer(m.marker)) {
                        map.removeLayer(m.marker);
                    }
                }
            });
        });
    });
}
// Update statistics display
function updateStatistics() {
    const totalFacilities = healthCenters.length;
    const referralHospitals = healthCenters.filter(h => h.type.includes('Referral')).length;
    const privateFacilities = healthCenters.filter(h => h.type.includes('Private')).length;
    
    // Update stats in the header
    document.querySelector('.stat-item').textContent = `📊 Total: ${totalFacilities} Facilities`;
    
    // Update quick stats cards
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards[0]) {
        statCards[0].querySelector('.stat-number').textContent = referralHospitals;
    }
    if (statCards[1]) {
        statCards[1].querySelector('.stat-number').textContent = privateFacilities;
    }
}
// Add legend with actual marker icons
function addLegend() {
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <h4>🏥 Facility Types</h4>
            <div class="legend-item">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" width="20" height="34" style="margin-right: 8px;">
                <div class="legend-text">National Referral Hospital</div>
            </div>
            <div class="legend-item">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" width="20" height="34" style="margin-right: 8px;">
                <div class="legend-text">Private Specialized Hospital</div>
            </div>
            <div class="legend-item">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" width="20" height="34" style="margin-right: 8px;">
                <div class="legend-text">Private Hospital</div>
            </div>
            <div class="legend-item">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" width="20" height="34" style="margin-right: 8px;">
                <div class="legend-text">General Hospital</div>
            </div>
            <div class="legend-item">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png" width="20" height="34" style="margin-right: 8px;">
                <div class="legend-text">Health Center IV</div>
            </div>
            <div class="legend-item">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png" width="20" height="34" style="margin-right: 8px;">
                <div class="legend-text">Health Center III</div>
            </div>
            <div class="legend-item">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png" width="20" height="34" style="margin-right: 8px;">
                <div class="legend-text">Other Facilities</div>
            </div>
        `;
        return div;
    };
    
    legend.addTo(map);

}
// Add scale control
L.control.scale({
    imperial: false, // Disable miles/feet
    metric: true,    // Enable kilometers/meters
    position: 'bottomleft', // Position on the map
    maxWidth: 200,   // Maximum width of the scale control
    updateWhenIdle: true // Update scale only when pan/zoom ends
}).addTo(map);
// Footer functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update last updated timestamp
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Update total facilities count
    const totalFacilitiesElement = document.getElementById('totalFacilities');
    if (totalFacilitiesElement) {
        totalFacilitiesElement.textContent = healthCenters.length;
    }
    
    // Emergency services button
    const emergencyBtn = document.getElementById('emergencyBtn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            filterEmergencyServices();
        });
    }
    
    // Find nearest facility button
    const nearestBtn = document.getElementById('nearestBtn');
    if (nearestBtn) {
        nearestBtn.addEventListener('click', function(e) {
            e.preventDefault();
            findNearestFacility();
        });
    }
    
    // Print map button
    const printBtn = document.getElementById('printMap');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Share map button
    const shareBtn = document.getElementById('shareMap');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            shareMap();
        });
    }
});

// Filter to show only emergency services
function filterEmergencyServices() {
    const emergencyCenters = healthCenters.filter(center => 
        center.emergency || center.services.some(service => 
            service.toLowerCase().includes('emergency') || 
            service.toLowerCase().includes('icu')
        )
    );
    
    if (emergencyCenters.length === 0) {
        alert('No emergency services found');
        return;
    }
    
    // Close all popups and hide all markers
    markers.forEach(m => {
        m.marker.closePopup();
        map.removeLayer(m.marker);
    });
    
    // Show only emergency centers
    emergencyCenters.forEach(center => {
        const marker = markers.find(m => m.data.name === center.name);
        if (marker) {
            map.addLayer(marker.marker);
        }
    });
    
    // Center on first emergency center
    if (emergencyCenters.length > 0) {
        const firstCenter = emergencyCenters[0];
        map.setView([firstCenter.lat, firstCenter.lng], 13);
        
        const foundMarker = markers.find(m => m.data.name === firstCenter.name);
        if (foundMarker) {
            foundMarker.marker.openPopup();
        }
    }
    
    alert(`Found ${emergencyCenters.length} facilities with emergency services`);
}

// Find nearest facility to user's location
function findNearestFacility() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // Calculate distances and find nearest
            let nearestCenter = null;
            let minDistance = Infinity;
            
            healthCenters.forEach(center => {
                const distance = calculateDistance(
                    userLat, userLng, 
                    center.lat, center.lng
                );
                
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestCenter = center;
                }
            });
            
            if (nearestCenter) {
                map.setView([nearestCenter.lat, nearestCenter.lng], 15);
                const marker = markers.find(m => m.data.name === nearestCenter.name);
                if (marker) {
                    marker.marker.openPopup();
                }
                
                alert(`Nearest facility: ${nearestCenter.name} (${minDistance.toFixed(1)} km away)`);
            }
        },
        function(error) {
            alert('Unable to get your location to find nearest facility');
        }
    );
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Share map functionality
function shareMap() {
    if (navigator.share) {
        navigator.share({
            title: 'Kampala Health Centers Map',
            text: 'Check out this interactive map of health facilities in Kampala District',
            url: window.location.href
        })
        .catch(error => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Map link copied to clipboard!'))
            .catch(() => {
                // Final fallback
                prompt('Copy this link to share:', window.location.href);
            });
    }
}
// Share map functionality
function shareMap() {
    const mapScreenshot = captureMapScreenshot();
    const shareData = {
        title: 'Kampala Health Centers Map',
        text: 'Check out this interactive map of health facilities in Kampala District, Uganda. Find hospitals, clinics, and emergency services near you.',
        url: window.location.href
    };

    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Map shared successfully'))
            .catch((error) => {
                console.log('Error sharing:', error);
                fallbackShare(shareData);
            });
    } else {
        fallbackShare(shareData);
    }
}

// Fallback sharing methods
function fallbackShare(shareData) {
    // Create a custom share modal
    const shareModal = createShareModal(shareData);
    document.body.appendChild(shareModal);
    
    // Show the modal
    setTimeout(() => {
        shareModal.classList.add('active');
    }, 100);
}

// Create a custom share modal
function createShareModal(shareData) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h3>📤 Share This Map</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="share-options">
                <div class="share-option" data-method="copy">
                    <div class="share-icon">📋</div>
                    <div class="share-text">Copy Link</div>
                </div>
                <div class="share-option" data-method="whatsapp">
                    <div class="share-icon">💚</div>
                    <div class="share-text">WhatsApp</div>
                </div>
                <div class="share-option" data-method="facebook">
                    <div class="share-icon">📘</div>
                    <div class="share-text">Facebook</div>
                </div>
                <div class="share-option" data-method="twitter">
                    <div class="share-icon">🐦</div>
                    <div class="share-text">Twitter</div>
                </div>
                <div class="share-option" data-method="email">
                    <div class="share-icon">📧</div>
                    <div class="share-text">Email</div>
                </div>
            </div>
            <div class="share-link">
                <input type="text" value="${shareData.url}" readonly id="shareUrl">
                <button class="copy-btn" id="copyUrlBtn">Copy</button>
            </div>
        </div>
    `;

    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => {
        closeShareModal(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeShareModal(modal);
        }
    });

    // Share option clicks
    modal.querySelectorAll('.share-option').forEach(option => {
        option.addEventListener('click', () => {
            const method = option.getAttribute('data-method');
            handleShareMethod(method, shareData);
        });
    });

    // Copy URL button
    modal.querySelector('#copyUrlBtn').addEventListener('click', () => {
        copyToClipboard(shareData.url);
        showShareFeedback('✅ Link copied to clipboard!');
    });

    return modal;
}

// Handle different share methods
function handleShareMethod(method, shareData) {
    const url = encodeURIComponent(shareData.url);
    const text = encodeURIComponent(shareData.text);
    const title = encodeURIComponent(shareData.title);

    let shareUrl;

    switch (method) {
        case 'copy':
            copyToClipboard(shareData.url);
            showShareFeedback('✅ Link copied to clipboard!');
            break;

        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            window.open(shareUrl, '_blank');
            break;

        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
            break;

        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
            break;

        case 'email':
            shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
            window.location.href = shareUrl;
            break;
    }
}

// Copy to clipboard function
function copyToClipboard(text) {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        return new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

// Show share feedback
function showShareFeedback(message) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.share-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    const feedback = document.createElement('div');
    feedback.className = 'share-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);

    // Show feedback
    setTimeout(() => {
        feedback.classList.add('show');
    }, 100);

    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 300);
    }, 3000);
}

// Close share modal
function closeShareModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 300);
}

// Capture map screenshot (placeholder - in real implementation, you might use html2canvas)
function captureMapScreenshot() {
    // This is a placeholder function
    // In a real implementation, you could use html2canvas to capture the map
    // For now, we'll just return null
    return null;
}

// Add event listener for share button
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.getElementById('shareMap');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareMap);
    }

    // Update last updated timestamp
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Update total facilities count
    const totalFacilitiesElement = document.getElementById('totalFacilities');
    if (totalFacilitiesElement) {
        totalFacilitiesElement.textContent = healthCenters.length;
    }
    
    // Other existing footer functionality...
    const emergencyBtn = document.getElementById('emergencyBtn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            filterEmergencyServices();
        });
    }
    
    const nearestBtn = document.getElementById('nearestBtn');
    if (nearestBtn) {
        nearestBtn.addEventListener('click', function(e) {
            e.preventDefault();
            findNearestFacility();
        });
    }
    
    const printBtn = document.getElementById('printMap');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
});

// Call the function to add legend
addLegend();

// Call this function after populating health centers
updateStatistics();

// Initialize filter buttons
addFilterButtons();

// Add keyboard shortcut for reset (Esc key)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        resetMapView();
    }
});
