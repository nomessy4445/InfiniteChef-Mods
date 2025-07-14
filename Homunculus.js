// Infinite Chef Mod: Homunculus Alchemy
// Creates procedural homunculi by mixing gems and DNA
// Inspired by: https://R74ncom.github.io/InfiniteChef-Mods/

// Ingredients: Gems
addIngredient("ruby_gem", {
    color: "#cc1133",
    type: "gem",
    shape: "crystal_cluster"
});
addIngredient("sapphire_gem", {
    color: "#1133cc",
    type: "gem",
    shape: "crystal_shard"
});
addIngredient("emerald_gem", {
    color: "#11cc66",
    type: "gem",
    shape: "crystal_fragment"
});

// Ingredients: DNA
addIngredient("beast_dna", {
    color: "#996633",
    type: "dna",
    shape: "gene_chain"
});
addIngredient("insect_dna", {
    color: "#ffcc00",
    type: "dna",
    shape: "gene_chain"
});
addIngredient("reptile_dna", {
    color: "#33cc99",
    type: "dna",
    shape: "gene_chain"
});

// Tool: Homunculus Synthesizer
addTool("homunculus_synthesizer", {
    shape: "vial",
    onSelect: function() {
        alert("Select two ingredients: one gem and one DNA to create a Homunculus.");
    },
    func: function(placed) {
        let gemColors = {
            "ruby_gem": "#cc1133",
            "sapphire_gem": "#1133cc",
            "emerald_gem": "#11cc66"
        };

        let dnaShapes = {
            "beast_dna": "animal_biped",
            "insect_dna": "insect_wings",
            "reptile_dna": "reptile_tail"
        };

        let gem = null;
        let dna = null;

        // Check nearby ingredients
        for (let i = 0; i < placed.adjacent.length; i++) {
            let adj = placed.adjacent[i];
            if (adj && adj.type === "gem") gem = adj;
            if (adj && adj.type === "dna") dna = adj;
        }

        if (gem && dna) {
            let id = "homunculus_" + Math.floor(Math.random() * 100000);
            let color = gemColors[gem.id] || "#999999";
            let shape = dnaShapes[dna.id] || "unknown_shape";

            // Register the new Homunculus
            addIngredient(id, {
                color: color,
                innerColor: "#f0f0f0",
                type: "homunculus",
                shape: shape
            });

            // Replace the tool with the created Homunculus
            placed.set1 = id;
            placed.set2 = null;

            alert("A new Homunculus has been created!");
        } else {
            alert("You need to place one gem and one DNA adjacent to the synthesizer.");
        }
    }
});
