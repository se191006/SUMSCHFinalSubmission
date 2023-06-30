// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract SupplyManagement {
    // Definieren Sie die Struktur einer Maschine
    struct Machine {
        string[] materials;
    }

    // Definieren Sie die Struktur eines zertifizierten Produkts
    struct CertifiedProduct {
        uint timestamp;
        string[] materials;
        uint[] materialQuantities;
        uint productNumber;
    }

    // Struktur zur Verfolgung des Materialverbrauchs
    struct MaterialConsumption {
        uint timestamp;
        string material;
        uint quantity;
    }

    // Mapping von Materialverbrauchsdaten
    mapping(string => MaterialConsumption[]) materialConsumptions;

    // Mapping von Maschinen
    mapping(uint => Machine) machines;
    // Mapping von Materiallager
    mapping(string => uint) materialStock;
    // Mapping von zertifizierten Produkten
    mapping(uint => CertifiedProduct[]) certifiedProducts;

    // Gesamtzahl der hergestellten Produkte
    uint public totalProductCount = 0;

    // Definieren Sie die verfügbaren Materialtypen
    string[] public materialTypes = ["A", "B", "C", "D"];

    // Konstanten für die Nachbestellung
    uint public constant reorderThreshold = 100;
    uint public constant reorderQuantity = 50;

    constructor() {
        // Initialisieren Sie die Materialien für jede Maschine
        machines[0].materials = ["A", "B", "C"];
        machines[1].materials = ["A", "C", "D"];
        machines[2].materials = ["A", "D", "B"];
        machines[3].materials = ["B", "C", "D"];

        // Initialisieren Sie das Materiallager
        for (uint i = 0; i < materialTypes.length; i++) {
            materialStock[materialTypes[i]] = 26;
        }
    }

    // Funktion, um Material dem Lager hinzuzufügen
    function addMaterial(string memory material, uint quantity) public {
        materialStock[material] += quantity;
    }

    // Funktion, um den Materialverbrauch zu simulieren und Material nachzubestellen
    function simulateConsumption(
        uint machineId,
        uint productionQuantity
    ) public {
        // Array für die verbrauchte Materialmenge
        uint[] memory consumedMaterials = new uint[](
            machines[machineId].materials.length
        );

        for (uint i = 0; i < machines[machineId].materials.length; i++) {
            string memory material = machines[machineId].materials[i];
            uint randomAmount = random(16) + 10; // Zufällige Menge zwischen 10 und 25

            if (materialStock[material] < randomAmount * productionQuantity) {
                addMaterial(material, reorderQuantity * productionQuantity); // Multipliziert mit der Produktionsmenge
            } else {
                materialStock[material] -= randomAmount * productionQuantity; // Multipliziert mit der Produktionsmenge
                consumedMaterials[i] = randomAmount * productionQuantity; // Multipliziert mit der Produktionsmenge

                // Speichern Sie die Verbrauchsdaten
                MaterialConsumption memory consumption = MaterialConsumption(
                    block.timestamp,
                    material,
                    randomAmount * productionQuantity
                );
                materialConsumptions[material].push(consumption);
            }

            if (materialStock[material] < reorderThreshold) {
                addMaterial(material, reorderQuantity * productionQuantity); // Multipliziert mit der Produktionsmenge
            }
        }

        // Erstellen Sie die zertifizierten Produkte
        for (uint i = 0; i < productionQuantity; i++) {
            // Kopieren Sie das consumedMaterials Array
            uint[] memory copiedConsumedMaterials = new uint[](
                machines[machineId].materials.length
            );
            for (uint j = 0; j < machines[machineId].materials.length; j++) {
                copiedConsumedMaterials[j] =
                    consumedMaterials[j] /
                    productionQuantity;
            }

            totalProductCount += 1; // Erhöhen Sie die Gesamtproduktanzahl für jedes erstellte Produkt
            CertifiedProduct memory product = CertifiedProduct(
                block.timestamp,
                machines[machineId].materials,
                copiedConsumedMaterials,
                totalProductCount
            );
            certifiedProducts[machineId].push(product);
        }
    }

    // Funktion, um eine Pseudozufallszahl zu generieren
    function random(uint number) public view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.prevrandao,
                        msg.sender
                    )
                )
            ) % number;
    }

    // Funktion um den aktuellen Bestand aller Materialien abzufragen
    function getAllMaterialStocks() public view returns (uint[] memory) {
        uint[] memory stocks = new uint[](materialTypes.length);

        for (uint i = 0; i < materialTypes.length; i++) {
            stocks[i] = materialStock[materialTypes[i]];
        }

        return stocks;
    }

    // Funktion um die Anzahl der zertifizierten Produkte für alle Maschinen abzurufen
    function getAllCertifiedProductCounts()
        public
        view
        returns (uint[] memory)
    {
        uint[] memory productCounts = new uint[](4); // Angenommen, es gibt 4 Maschinen

        for (uint i = 0; i < 4; i++) {
            productCounts[i] = certifiedProducts[i].length;
        }

        return productCounts;
    }

    // Funktion um den historischen Verbrauch eines Materials abzurufen
    function getMaterialConsumptionHistory(
        string memory material
    ) public view returns (MaterialConsumption[] memory) {
        return materialConsumptions[material];
    }

    // Funktion um alle zertifizierten Produkte für eine Maschine abzurufen
    function getCertifiedProducts(
        uint machineId
    ) public view returns (CertifiedProduct[] memory) {
        return certifiedProducts[machineId];
    }
}
