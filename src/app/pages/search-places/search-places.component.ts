import { Component } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.scss'],
})
export class SearchPlacesComponent {
  ngAfterViewInit(): void {
    const map = new Map('map').setView([3.44898, -76.52781], 13);
    tileLayer(
      'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
        attribution:
          '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    const markerItem = marker([3.44898, -76.52781]).addTo(map).bindTooltip('a ver')
    map.fitBounds([
      [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
    ]);
  }
}
