import { KotlinSourceFile } from '../types/hejGoteborg';

export const ANDROID_KOTLIN_FILES: KotlinSourceFile[] = [
  {
    filename: 'MainActivity.kt',
    packagePath: 'app/src/main/java/se/hejgoteborg/app/MainActivity.kt',
    description: {
      hr: 'Ulazna točka Android aplikacije s izbornikom jezika (HR / EN / SV) u TopAppBaru i Material 3 navigacijom.',
      en: 'Android entry point with a top-bar language switcher (HR / EN / SV) and Material 3 bottom navigation.',
      sv: 'Startpunkt för Android-appen med språkval (HR / EN / SV) i TopAppBar och Material 3-navigering.',
    },
    code: `package se.hejgoteborg.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Book
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material.icons.outlined.Language
import androidx.compose.material.icons.outlined.Place
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import se.hejgoteborg.app.data.AppLanguage
import se.hejgoteborg.app.ui.ChecklistScreen
import se.hejgoteborg.app.ui.GlossaryScreen
import se.hejgoteborg.app.ui.ServicesScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            HejGoteborgTheme {
                HejGoteborgApp()
            }
        }
    }
}

enum class AppDestination {
    CHECKLIST, GLOSSARY, SERVICES
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HejGoteborgApp() {
    var currentTab by remember { mutableStateOf(AppDestination.CHECKLIST) }
    var language by remember { mutableStateOf(AppLanguage.HR) }
    var langMenuExpanded by remember { mutableStateOf(false) }

    val navLabels = when (language) {
        AppLanguage.HR -> Triple("90 Dana", "Rječnik", "Usluge")
        AppLanguage.EN -> Triple("90 Days", "Glossary", "Services")
        AppLanguage.SV -> Triple("90 Dagar", "Ordlista", "Platser")
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Hej Göteborg") },
                actions = {
                    Box {
                        TextButton(onClick = { langMenuExpanded = true }) {
                            Icon(Icons.Outlined.Language, contentDescription = "Language")
                            Text(" \${language.code}")
                        }
                        DropdownMenu(
                            expanded = langMenuExpanded,
                            onDismissRequest = { langMenuExpanded = false }
                        ) {
                            AppLanguage.entries.forEach { option ->
                                DropdownMenuItem(
                                    text = { Text(option.displayName) },
                                    onClick = {
                                        language = option
                                        langMenuExpanded = false
                                    }
                                )
                            }
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = currentTab == AppDestination.CHECKLIST,
                    onClick = { currentTab = AppDestination.CHECKLIST },
                    icon = { Icon(Icons.Outlined.CheckCircle, contentDescription = null) },
                    label = { Text(navLabels.first) }
                )
                NavigationBarItem(
                    selected = currentTab == AppDestination.GLOSSARY,
                    onClick = { currentTab = AppDestination.GLOSSARY },
                    icon = { Icon(Icons.Outlined.Book, contentDescription = null) },
                    label = { Text(navLabels.second) }
                )
                NavigationBarItem(
                    selected = currentTab == AppDestination.SERVICES,
                    onClick = { currentTab = AppDestination.SERVICES },
                    icon = { Icon(Icons.Outlined.Place, contentDescription = null) },
                    label = { Text(navLabels.third) }
                )
            }
        }
    ) { innerPadding ->
        val modifier = Modifier.padding(innerPadding)
        when (currentTab) {
            AppDestination.CHECKLIST -> ChecklistScreen(language, modifier)
            AppDestination.GLOSSARY -> GlossaryScreen(language, modifier)
            AppDestination.SERVICES -> ServicesScreen(language, modifier)
        }
    }
}

@Composable
fun HejGoteborgTheme(content: @Composable () -> Unit) {
    val colors = lightColorScheme(
        primary = Color(0xFF0F4C81),
        onPrimary = Color.White,
        surface = Color(0xFFFFFFFF),
        background = Color(0xFFF8FAFC)
    )
    MaterialTheme(colorScheme = colors, content = content)
}
`,
  },
  {
    filename: 'HejGoteborgModels.kt',
    packagePath: 'app/src/main/java/se/hejgoteborg/app/data/HejGoteborgModels.kt',
    description: {
      hr: 'Višejezični podatkovni modeli (HR / EN / SV) i lokalni podaci za Göteborg.',
      en: 'Multilingual data models (HR / EN / SV) and Gothenburg repository.',
      sv: 'Flerspråkiga datamodeller (HR / EN / SV) och lokal Göteborgsinformation.',
    },
    code: `package se.hejgoteborg.app.data

enum class AppLanguage(val code: String, val displayName: String) {
    HR("HR", "Hrvatski"),
    EN("EN", "English"),
    SV("SV", "Svenska")
}

data class LocalizedText(
    val hr: String,
    val en: String,
    val sv: String
) {
    fun get(lang: AppLanguage): String = when (lang) {
        AppLanguage.HR -> hr
        AppLanguage.EN -> en
        AppLanguage.SV -> sv
    }
}

data class ChecklistStep(
    val id: String,
    val order: Int,
    val title: LocalizedText,
    val swedishTerm: String,
    val locationAddress: String,
    val tramLines: String,
    val practicalTip: LocalizedText
)

data class GlossaryEntry(
    val id: String,
    val swedish: String,
    val pronunciation: String,
    val translation: LocalizedText,
    val explanation: LocalizedText
)

object GothenburgRepository {
    val steps = listOf(
        ChecklistStep(
            id = "personnummer",
            order = 1,
            title = LocalizedText(
                hr = "Prijava prebivališta i Personnummer",
                en = "Population Registration & Personnummer",
                sv = "Folkbokföring & Personnummer"
            ),
            swedishTerm = "Folkbokföring",
            locationAddress = "Olof Palmes plats 1, 413 04 Göteborg",
            tramLines = "Spårvagn 1, 6, 9, 11 (Järntorget)",
            practicalTip = LocalizedText(
                hr = "Ispunite online prijavu na skatteverket.se prije dolaska radi QR koda.",
                en = "Complete the online pre-registration at skatteverket.se before visiting.",
                sv = "Gör flyttanmälan digitalt på skatteverket.se innan besöket."
            )
        ),
        ChecklistStep(
            id = "id_kort",
            order = 2,
            title = LocalizedText(
                hr = "Švedska osobna iskaznica (ID-kort)",
                en = "Swedish Tax Agency ID Card",
                sv = "Skatteverkets ID-kort"
            ),
            swedishTerm = "Skatteverkets ID-kort",
            locationAddress = "Olof Palmes plats 1, 413 04 Göteborg",
            tramLines = "Spårvagn 1, 6, 9, 11 (Järntorget)",
            practicalTip = LocalizedText(
                hr = "Bez švedskog ID-korta banke u pravilu ne izdaju Mobilt BankID.",
                en = "Banks generally require a Swedish ID-kort before issuing Mobilt BankID.",
                sv = "Bankerna kräver vanligtvis svenskt ID-kort för Mobilt BankID."
            )
        )
    )

    val glossary = listOf(
        GlossaryEntry(
            id = "vab",
            swedish = "VAB (Vård av barn)",
            pronunciation = "vab",
            translation = LocalizedText(
                hr = "Bolovanje za njegu djeteta",
                en = "Leave to care for a sick child",
                sv = "Ersättning vid vård av sjukt barn"
            ),
            explanation = LocalizedText(
                hr = "Naknada preko Försäkringskassana kada dijete ne može u vrtić.",
                en = "Compensation via Försäkringskassan when your child cannot attend preschool.",
                sv = "Tillfällig föräldrapenning från Försäkringskassan när barnet är sjukt."
            )
        )
    )
}
`,
  },
  {
    filename: 'ChecklistScreen.kt',
    packagePath: 'app/src/main/java/se/hejgoteborg/app/ui/ChecklistScreen.kt',
    description: {
      hr: 'Jetpack Compose ekran s napretkom od 90 dana i Google Maps Intentom.',
      en: 'Jetpack Compose 90-day checklist screen with localized labels and Maps Intent.',
      sv: 'Jetpack Compose-vy för 90-dagarslistan med språkstöd och Google Maps Intent.',
    },
    code: `package se.hejgoteborg.app.ui

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import se.hejgoteborg.app.data.AppLanguage
import se.hejgoteborg.app.data.ChecklistStep
import se.hejgoteborg.app.data.GothenburgRepository

@Composable
fun ChecklistScreen(language: AppLanguage, modifier: Modifier = Modifier) {
    val context = LocalContext.current
    var completedIds by remember { mutableStateOf(setOf<String>()) }
    var selectedStep by remember { mutableStateOf<ChecklistStep?>(null) }

    val steps = GothenburgRepository.steps
    val progress = if (steps.isEmpty()) 0f else completedIds.size.toFloat() / steps.size

    val headerTitle = when (language) {
        AppLanguage.HR -> "Prvih 90 dana u Göteborgu"
        AppLanguage.EN -> "First 90 Days in Gothenburg"
        AppLanguage.SV -> "Första 90 dagarna i Göteborg"
    }

    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            OutlinedCard(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = headerTitle,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    LinearProgressIndicator(
                        progress = { progress },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "\${completedIds.size} / \${steps.size}",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }

        items(steps, key = { it.id }) { step ->
            val isDone = completedIds.contains(step.id)
            OutlinedCard(
                onClick = { selectedStep = step },
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Checkbox(
                        checked = isDone,
                        onCheckedChange = { checked ->
                            completedIds = if (checked) completedIds + step.id else completedIds - step.id
                        }
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "\${step.order}. \${step.title.get(language)}",
                            style = MaterialTheme.typography.titleSmall
                        )
                        Text(
                            text = "\${step.swedishTerm} · \${step.tramLines}",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }
    }

    selectedStep?.let { step ->
        AlertDialog(
            onDismissRequest = { selectedStep = null },
            title = { Text(step.title.get(language)) },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(step.locationAddress)
                    Text(step.tramLines)
                    Text(step.practicalTip.get(language))
                }
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        val uri = Uri.parse("geo:0,0?q=" + Uri.encode(step.locationAddress))
                        context.startActivity(Intent(Intent.ACTION_VIEW, uri))
                    }
                ) {
                    Text("Maps")
                }
            },
            dismissButton = {
                TextButton(onClick = { selectedStep = null }) {
                    Text("OK")
                }
            }
        )
    }
}
`,
  },
  {
    filename: 'GlossaryScreen.kt & ServicesScreen.kt',
    packagePath: 'app/src/main/java/se/hejgoteborg/app/ui/GlossaryAndServices.kt',
    description: {
      hr: 'Višejezični rječnik i imenik ustanova u Göteborgu.',
      en: 'Multilingual glossary and Gothenburg directory screens.',
      sv: 'Flerspråkig ordlista och katalog över platser i Göteborg.',
    },
    code: `package se.hejgoteborg.app.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import se.hejgoteborg.app.data.AppLanguage
import se.hejgoteborg.app.data.GothenburgRepository

@Composable
fun GlossaryScreen(language: AppLanguage, modifier: Modifier = Modifier) {
    var query by remember { mutableStateOf("") }
    val filtered = GothenburgRepository.glossary.filter {
        it.swedish.contains(query, ignoreCase = true) ||
            it.translation.get(language).contains(query, ignoreCase = true)
    }

    val searchLabel = when (language) {
        AppLanguage.HR -> "Pretraži pojam..."
        AppLanguage.EN -> "Search term..."
        AppLanguage.SV -> "Sök begrepp..."
    }

    Column(modifier = modifier.fillMaxSize().padding(16.dp)) {
        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            label = { Text(searchLabel) },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true
        )
        Spacer(modifier = Modifier.height(12.dp))
        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(filtered, key = { it.id }) { item ->
                OutlinedCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(item.swedish, style = MaterialTheme.typography.titleMedium)
                        Text(
                            "\${item.pronunciation} · \${item.translation.get(language)}",
                            style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(item.explanation.get(language), style = MaterialTheme.typography.bodyMedium)
                    }
                }
            }
        }
    }
}

@Composable
fun ServicesScreen(language: AppLanguage, modifier: Modifier = Modifier) {
    val title = when (language) {
        AppLanguage.HR -> "Ključne ustanove u Göteborgu"
        AppLanguage.EN -> "Key Gothenburg Institutions"
        AppLanguage.SV -> "Viktiga platser i Göteborg"
    }
    Column(modifier = modifier.fillMaxSize().padding(16.dp)) {
        Text(text = title, style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Skatteverket: Olof Palmes plats 1 (Järntorget)\\n" +
                "Sahlgrenska Akuten: Blå stråket 5\\n" +
                "Vuxenutbildning SFI: Rosenlundsgatan 4",
            style = MaterialTheme.typography.bodyMedium
        )
    }
}
`,
  },
];
