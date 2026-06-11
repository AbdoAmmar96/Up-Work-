<?php

namespace Database\Seeders;

use App\Models\GalleryAlbum;
use App\Models\PageSection;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\Service;
use App\Models\Setting;
use App\Models\User;
use App\Models\Video;
use App\Models\VideoCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedRolesAndAdmin();
        $this->seedSettings();
        $this->seedPageSections();
        $this->seedServices();
        $this->seedProjects();
        $this->seedVideos();
        $this->seedGallery();
    }

    private function seedRolesAndAdmin(): void
    {
        $owner = Role::firstOrCreate(['name' => 'owner']);
        Role::firstOrCreate(['name' => 'editor']);

        $admin = User::updateOrCreate(
            ['email' => 'admin@upwork-eg.com'],
            ['name' => 'UP Work Admin', 'password' => Hash::make('Password123!')]
        );
        $admin->syncRoles([$owner->name]);
    }

    private function seedSettings(): void
    {
        $settings = [
            'site_title' => ['ar' => 'UP Work', 'en' => 'UP Work'],
            'tagline' => ['ar' => 'نهندس · نبني · نرتقي', 'en' => 'Engineer · Build · Elevate'],
            'slogan' => ['ar' => 'نبني ما هو أبعد من اليوم، ونرتقي بالغد', 'en' => 'Building Beyond Today. Elevating Tomorrow.'],
            'phone' => '+20 100 777 9886',
            'whatsapp' => '201007779886',
            'email' => 'info@upwork-eg.com',
            'address' => ['ar' => 'مدينة العبور، الحي الأول', 'en' => 'Obour City, First District'],
            'working_hours' => ['ar' => 'السبت – الخميس، 9 ص – 5 م', 'en' => 'Sat–Thu, 9am–5pm'],
            'social' => ['facebook' => '#', 'instagram' => '#', 'linkedin' => '#', 'youtube' => '#'],
            'colors' => ['primary' => '#1E40AF', 'accent' => '#F97316', 'dark' => '#1F2937', 'light' => '#E5E7EB'],
            'capabilities' => [
                ['ar' => 'مشاريع تسليم مفتاح', 'en' => 'Turnkey Projects'],
                ['ar' => 'أعمال التصميم', 'en' => 'Design Works'],
                ['ar' => 'أعمال مدنية', 'en' => 'Civil Works'],
                ['ar' => 'أعمال معدنية', 'en' => 'Steel Works'],
                ['ar' => 'سايلوهات وتنكات', 'en' => 'Tanks & Silos'],
                ['ar' => 'جمالونات', 'en' => 'Steel Frames'],
                ['ar' => 'كهروميكانيكا', 'en' => 'Electromechanical'],
                ['ar' => 'تشطيبات', 'en' => 'Finishing'],
                ['ar' => 'عزل', 'en' => 'Insulation'],
                ['ar' => 'خدمات هندسية', 'en' => 'Engineering Services'],
            ],
            'clients' => [
                ['name' => 'Advocure', 'logo' => '/clients/advocure.png'],
                ['name' => 'Danone', 'logo' => '/clients/danone.png'],
                ['name' => 'H2O Group', 'logo' => '/clients/h2o.png'],
                ['name' => 'Kandil Glass', 'logo' => '/clients/kandilglass.png'],
                ['name' => 'Koki', 'logo' => '/clients/koki.png'],
                ['name' => 'Kandil Steel', 'logo' => '/clients/kandilsteel.png'],
                ['name' => 'Egyptian Starch & Glucose', 'logo' => '/clients/egyptianstarch.png'],
                ['name' => 'Otsuka', 'logo' => '/clients/otsuka.png'],
                ['name' => 'Akhnaton', 'logo' => '/clients/akhnaton.png'],
                ['name' => 'Eva Cosmetics', 'logo' => '/clients/eva.png'],
                ['name' => 'United Company of Pharmacists', 'logo' => '/clients/ucp.png'],
                ['name' => 'Farm Frites', 'logo' => '/clients/farmfrites.png'],
                ['name' => 'Ülker', 'logo' => '/clients/ulker.png'],
                ['name' => 'Avon', 'logo' => '/clients/avon.png'],
                ['name' => 'Oriflame', 'logo' => '/clients/oriflame.png'],
            ],
            'logo' => null,
            'seo_title' => ['ar' => 'UP Work | هندسة ومقاولات', 'en' => 'UP Work | Engineering & Construction'],
            'seo_description' => [
                'ar' => 'شركة هندسة ومقاولات حديثة في مصر: مقاولات وإنشاءات، إدارة مشاريع هندسية، وتطوير بنية تحتية بأعلى معايير الجودة.',
                'en' => 'A modern engineering and construction company in Egypt: contracting, engineering project management, and infrastructure development at the highest standards.',
            ],
        ];

        foreach ($settings as $key => $value) {
            Setting::put($key, $value);
        }
    }

    private function seedPageSections(): void
    {
        $sections = [
            [
                'key' => 'home_hero',
                'page' => 'home',
                'sort_order' => 1,
                'payload' => [
                    'eyebrow' => ['ar' => 'هندسة ومقاولات حديثة', 'en' => 'Modern engineering & construction'],
                    'title' => ['ar' => 'نبني مشاريع تصمد، ونسلّمها في وقتها', 'en' => 'We build projects that last — and deliver them on time'],
                    'subtitle' => [
                        'ar' => 'من المباني السكنية والتجارية إلى المنشآت الصناعية والبنية التحتية، ننفّذ بدقّة هندسية وبأعلى معايير الجودة والسلامة.',
                        'en' => 'From residential and commercial buildings to industrial facilities and infrastructure — executed with engineering precision and the highest standards of quality and safety.',
                    ],
                    'primary_cta' => ['ar' => 'ابدأ مشروعك', 'en' => 'Start your project'],
                    'secondary_cta' => ['ar' => 'شوف أعمالنا', 'en' => 'See our work'],
                ],
            ],
            [
                'key' => 'home_pillars',
                'page' => 'home',
                'sort_order' => 2,
                'payload' => [
                    'items' => [
                        ['icon' => 'ti-helmet', 'title' => ['ar' => 'هندسة متقنة', 'en' => 'Expert Engineering'], 'text' => ['ar' => 'فريق هندسي ينفّذ بدقّة في كل تفصيلة.', 'en' => 'An engineering team that executes with precision in every detail.']],
                        ['icon' => 'ti-building', 'title' => ['ar' => 'بناء بجودة عالية', 'en' => 'Quality Construction'], 'text' => ['ar' => 'تنفيذ يلتزم بأعلى معايير الجودة والسلامة.', 'en' => 'Build quality that meets the highest standards of safety.']],
                        ['icon' => 'ti-trending-up', 'title' => ['ar' => 'ارتقاء دائم', 'en' => 'Continuous Elevation'], 'text' => ['ar' => 'حلول مستدامة تنمو مع رؤيتك.', 'en' => 'Sustainable solutions that grow with your vision.']],
                    ],
                ],
            ],
            [
                'key' => 'home_stats',
                'page' => 'home',
                'sort_order' => 3,
                'payload' => [
                    'items' => [
                        ['value' => '12+', 'label' => ['ar' => 'سنة خبرة', 'en' => 'Years of experience']],
                        ['value' => '150+', 'label' => ['ar' => 'مشروع مُسلَّم', 'en' => 'Projects delivered']],
                        ['value' => '40+', 'label' => ['ar' => 'عميل', 'en' => 'Clients']],
                        ['value' => '98%', 'label' => ['ar' => 'تسليم في الموعد', 'en' => 'On-time delivery']],
                    ],
                ],
            ],
            [
                'key' => 'about_intro',
                'page' => 'about',
                'sort_order' => 1,
                'payload' => [
                    'title' => ['ar' => 'من نحن', 'en' => 'About UP Work'],
                    'body' => [
                        'ar' => 'يقولون إن لحظة الحقيقة لشركات المقاولات تأتي مع التقدّم في السن، فتجاوز العشرين عامًا في هذا المجال علامة بارزة على النضج والوجود القوي. نحن نوظّف أكثر من 300 فرد ونعمل من خلال شركتين فرعيتين مملوكتين بالكامل: الشركة المصرية الألمانية للأعمال الإنشائية ومجموعة United، مع حضور قوي وسريع النمو في السودان. عبر UP Work نتخصّص في مشاريع كبيرة ومعقّدة للغاية مثل المخازن الإقليمية والمنشآت الصناعية والبنية التحتية والمستشفيات والمساحات التجارية. كما نملك خطوطًا تكميلية تشمل مصانع تصنيع المعادن ومصنع لإنتاج منتجات الخرسانة.',
                        'en' => 'They say that the moment of truth for construction companies comes with age — passing 20 years in this business is a landmark and a sign of maturity and a strong, rapidly growing presence in Sudan. We employ more than 300 individuals and operate through two fully owned subsidiary companies: EGYPT-GERMAN for construction works and United Group. Through UP-Work we specialize in large-scale, highly complex projects such as regional stores, industrial plants, infrastructure, hospitals and commercial spaces. UP-Work also owns complementary business lines including steel fabrication plants and a concrete products production plant.',
                    ],
                ],
            ],
            [
                'key' => 'about_values',
                'page' => 'about',
                'sort_order' => 2,
                'payload' => [
                    'items' => [
                        ['title' => ['ar' => 'ديناميكية', 'en' => 'Dynamic'], 'text' => ['ar' => 'مبنيّون للحركة للأمام والتقدّم الحقيقي.', 'en' => 'Built for forward movement and real progress.']],
                        ['title' => ['ar' => 'خبرة', 'en' => 'Expert'], 'text' => ['ar' => 'معرفة تقنية عميقة وتنفيذ مثبت.', 'en' => 'Deep technical knowledge and proven execution.']],
                        ['title' => ['ar' => 'قابلية للتوسّع', 'en' => 'Scalable'], 'text' => ['ar' => 'حلول تنمو مع رؤيتك وأعمالك.', 'en' => 'Solutions that grow with your vision and business.']],
                        ['title' => ['ar' => 'دقّة', 'en' => 'Precise'], 'text' => ['ar' => 'دقّة في كل تفصيلة، وتميّز في كل بناء.', 'en' => 'Accuracy in every detail. Excellence in every build.']],
                    ],
                ],
            ],
            [
                'key' => 'about_vms',
                'page' => 'about',
                'sort_order' => 3,
                'payload' => [
                    'items' => [
                        [
                            'title' => ['ar' => 'رؤيتنا', 'en' => 'Our Vision'],
                            'text' => [
                                'ar' => 'بالاستفادة من أدائنا الاستثنائي خلال أكثر من 20 عامًا من وجودنا، والخبرة المكتسبة في تقديم تصميم متكامل بأسعار مناسبة وجودة عالية، نطمح أن نكون المقاول والمطوّر الأكثر ثقة وتأهيلًا في الشرق الأوسط، ورائدًا قويًا في الداخل والشريك الإقليمي المفضّل.',
                                'en' => 'Leveraging our exceptional performance through our 20+ years of existence, and the experience acquired in providing integrated, rightly-priced and highly styled construction. We aspire to be recognized as the most trusted and qualified contractor and developer in the Middle East — a solid leader at home and the regional partner of choice.',
                            ],
                        ],
                        [
                            'title' => ['ar' => 'مهمتنا', 'en' => 'Our Mission'],
                            'text' => [
                                'ar' => 'بفضل رأس مالنا البشري الذي نعتزّ به، سنترك بصمة في أسواقنا المحلية والأجنبية، باحثين عن أعمال عالية القيمة الأنسب لمقاول مختار للهندسة القيمة بتناغم وأسلوب مميّز. أن نكون الأفضل في السلامة والجودة والوقت والتكلفة في المنطقة.',
                                'en' => 'With our human capital that we most cherish, we will be out there constructing a difference in our domestic and foreign markets — seeking high-value and complex business most suitable for a contractor of choice for value engineering with synergy and style. To be the region’s top safety, quality, time and cost performer.',
                            ],
                        ],
                        [
                            'title' => ['ar' => 'إستراتيجيتنا', 'en' => 'Our Strategy'],
                            'text' => [
                                'ar' => 'لضمان نمونا الحالي بشكل مستدام، سنجعل أولوياتنا جذب وتطوير الأفراد المؤهّلين في أسواقنا والحفاظ عليهم؛ فالاستثمار المستمر في الأفراد على جميع مستويات أعمالنا هو حجر الزاوية في إستراتيجيتنا لتحقيق نموٍّ وتنمية مستدامين في المستقبل.',
                                'en' => 'To ensure our present growth is sustainable, we prioritize our efforts to attract, develop and retain the most qualified individuals in our markets. This ongoing investment in people, at all levels of our business, is the corner stone of our strategy for a sustainable future growth and development.',
                            ],
                        ],
                    ],
                ],
            ],
            [
                'key' => 'about_cta',
                'page' => 'about',
                'sort_order' => 4,
                'payload' => [
                    'title' => ['ar' => 'هل لديك مشروع في ذهنك؟', 'en' => 'Have a project in mind?'],
                    'text' => ['ar' => 'تواصل معنا، ونحوّل فكرتك إلى خطة تنفيذ واضحة بجدول زمني وميزانية.', 'en' => 'Talk to us — we turn your idea into a clear execution plan with a timeline and a budget.'],
                    'cta' => ['ar' => 'تواصل معنا', 'en' => 'Contact us'],
                ],
            ],
        ];

        foreach ($sections as $s) {
            PageSection::updateOrCreate(['key' => $s['key']], $s);
        }
    }

    private function seedServices(): void
    {
        $services = [
            [
                'icon' => 'layers',
                'sort_order' => 1,
                'title' => ['ar' => 'أعمال التصميم', 'en' => 'Design Works'],
                'excerpt' => ['ar' => 'تصاميم هندسية دقيقة تترجم رؤيتك إلى مخططات تنفيذية.', 'en' => 'Precise engineering designs that turn your vision into executable plans.'],
                'body' => [
                    'ar' => 'نقدّم خدمات التصميم الهندسي المتكامل لمشاريع الإنشاءات والمنشآت الصناعية، بمخطّطات دقيقة تراعي الجودة والكفاءة والتكلفة، وتمهّد لتنفيذ سلس ومضبوط.',
                    'en' => 'We provide integrated engineering design services for construction and industrial projects — accurate plans that balance quality, efficiency and cost, paving the way for smooth, controlled execution.',
                ],
                'items' => [
                    ['ar' => 'التصميم المعماري', 'en' => 'Architectural design'],
                    ['ar' => 'التصميم الإنشائي', 'en' => 'Structural design'],
                    ['ar' => 'تصميم المنشآت الصناعية', 'en' => 'Industrial facilities design'],
                    ['ar' => 'مخططات تنفيذية تفصيلية', 'en' => 'Detailed shop drawings'],
                ],
            ],
            [
                'icon' => 'building-skyscraper',
                'sort_order' => 2,
                'title' => ['ar' => 'الأعمال المدنية', 'en' => 'Civil Works'],
                'excerpt' => ['ar' => 'أعمال التربة والخرسانات والعزل والتشطيبات.', 'en' => 'Earth works, concrete, insulation and finishing.'],
                'body' => [
                    'ar' => 'ننفّذ كامل الأعمال المدنية: أعمال التربة (Earth Works)، والخرسانات (Concrete Works)، وأعمال العزل (Insulation)، والتشطيبات (Finishing)، بفريق هندسي ومعدّات تضمن الجودة والالتزام بالمواعيد.',
                    'en' => 'We carry out all civil works: Earth Works, Concrete Works, Insulation Works and Finishing Works — with an engineering team and equipment that guarantee quality and on-time delivery.',
                ],
                'items' => [
                    ['ar' => 'أعمال التربة', 'en' => 'Earth Works'],
                    ['ar' => 'أعمال الخرسانات', 'en' => 'Concrete Works'],
                    ['ar' => 'أعمال العزل', 'en' => 'Insulation Works'],
                    ['ar' => 'أعمال التشطيبات', 'en' => 'Finishing Works'],
                ],
            ],
            [
                'icon' => 'building',
                'sort_order' => 3,
                'title' => ['ar' => 'الأعمال المعدنية', 'en' => 'Steel Works'],
                'excerpt' => ['ar' => 'هياكل معدنية وجمالونات وخزّانات وسايلوهات.', 'en' => 'Steel structures, frames, storage tanks and silos.'],
                'body' => [
                    'ar' => 'نصمّم وننفّذ الهياكل المعدنية (Portal & Truss Frames)، وتصنيع الأوناش بأي قدرة تحميل، وخزّانات التخزين بأنواعها (رأسي، أفقي، على عربة، تحت الأرض، أحادي ومزدوج الجدار)، والسايلوهات بالاستانلس والألومنيوم.',
                    'en' => 'We design and build steel structures (Portal & Truss Frames), fabricate cranes of any load capacity, and produce all types of storage tanks (vertical, horizontal, on-car, underground, single & double jacket) and silos in stainless steel and aluminum.',
                ],
                'items' => [
                    ['ar' => 'الهياكل المعدنية (جمالونات)', 'en' => 'Steel Structures (Frames)'],
                    ['ar' => 'تصنيع الأوناش بأي حمولة', 'en' => 'Crane fabrication (any capacity)'],
                    ['ar' => 'خزّانات التخزين', 'en' => 'Storage Tanks'],
                    ['ar' => 'السايلوهات والتنكات', 'en' => 'Silos & Tanks'],
                ],
            ],
            [
                'icon' => 'spark',
                'sort_order' => 4,
                'title' => ['ar' => 'الأعمال الإلكتروميكانيكية', 'en' => 'Electro-Mechanical Works'],
                'excerpt' => ['ar' => 'تيار منخفض، تكييف، إنذار ومكافحة حريق، وسباكة.', 'en' => 'Low current, HVAC, fire alarm & fighting, plumbing.'],
                'body' => [
                    'ar' => 'ننفّذ كامل الأعمال الإلكتروميكانيكية: أعمال التيار المنخفض (Low current)، وأعمال التكييف (HVAC)، وأنظمة الإنذار ومكافحة الحريق (Fire alarm & Fire fighting)، وأعمال الصرف الصحي والسباكة (Drainage & Plumbing).',
                    'en' => 'We deliver complete electro-mechanical works: Low current works, HVAC works, Fire alarm & Fire fighting systems, and Drainage & Plumbing works.',
                ],
                'items' => [
                    ['ar' => 'أعمال التيار المنخفض', 'en' => 'Low current works'],
                    ['ar' => 'أعمال التكييف', 'en' => 'HVAC works'],
                    ['ar' => 'الإنذار ومكافحة الحريق', 'en' => 'Fire alarm & Fire fighting'],
                    ['ar' => 'الصرف الصحي والسباكة', 'en' => 'Drainage & Plumbing'],
                ],
            ],
            [
                'icon' => 'trending-up',
                'sort_order' => 5,
                'title' => ['ar' => 'الخدمات الهندسية', 'en' => 'Engineering Services'],
                'excerpt' => ['ar' => 'سيور نقل، أنظمة تخزين (راكينج)، طاولات رفع، وتركيب ماكينات.', 'en' => 'Conveyors, racking systems, scissor lift tables and machine installations.'],
                'body' => [
                    'ar' => 'نوفّر خدمات هندسية متخصّصة تشمل: أنواع السيور الناقلة (Belt / Roller / Chain / Screw conveyors)، وأنظمة التخزين الثقيلة والمتوسطة والخفيفة (Racking systems)، وطاولات الرفع المقصية (Scissor lift tables) بأي قدرة وأبعاد وارتفاع، وتركيب جميع أنواع الماكينات وربطها بخطوط الإنتاج.',
                    'en' => 'We provide specialized engineering services including: all types of conveyors (Belt / Roller / Chain / Screw), heavy/medium/light racking systems, scissor lift tables of any capacity, dimensions and height, and installation of all machine types linked to their production lines.',
                ],
                'items' => [
                    ['ar' => 'السيور الناقلة (Conveyors)', 'en' => 'Conveyors'],
                    ['ar' => 'أنظمة التخزين (Racking)', 'en' => 'Racking systems'],
                    ['ar' => 'طاولات الرفع المقصية', 'en' => 'Scissor lift tables'],
                    ['ar' => 'تركيب الماكينات', 'en' => 'Machine installations'],
                ],
            ],
        ];

        foreach ($services as $s) {
            Service::create($s);
        }
    }

    private function seedProjects(): void
    {
        $categories = [
            'residential' => ['ar' => 'سكني', 'en' => 'Residential'],
            'commercial' => ['ar' => 'تجاري', 'en' => 'Commercial'],
            'industrial' => ['ar' => 'صناعي', 'en' => 'Industrial'],
            'infrastructure' => ['ar' => 'بنية تحتية', 'en' => 'Infrastructure'],
        ];
        $cats = [];
        $i = 1;
        foreach ($categories as $key => $title) {
            $cats[$key] = ProjectCategory::create(['title' => $title, 'sort_order' => $i++]);
        }

        $projects = [
            [
                'cat' => 'residential', 'year' => 2024, 'is_featured' => true, 'sort_order' => 1,
                'title' => ['ar' => 'برج سكني — التجمّع الخامس', 'en' => 'Residential Tower — New Cairo'],
                'location' => ['ar' => 'القاهرة الجديدة', 'en' => 'New Cairo'],
                'summary' => ['ar' => 'برج سكني متكامل من التصميم حتى التشطيب.', 'en' => 'A complete residential tower from design to finishing.'],
                'body' => ['ar' => 'تنفيذ كامل لبرج سكني يشمل الأعمال الإنشائية والتشطيبات والأعمال الكهروميكانيكية، بجودة عالية وفي الموعد المحدّد.', 'en' => 'Full delivery of a residential tower including structural works, finishing, and electromechanical works — high quality, on schedule.'],
            ],
            [
                'cat' => 'commercial', 'year' => 2023, 'is_featured' => true, 'sort_order' => 2,
                'title' => ['ar' => 'مجمّع تجاري', 'en' => 'Commercial Complex'],
                'location' => ['ar' => '6 أكتوبر', 'en' => '6th of October'],
                'summary' => ['ar' => 'مساحات تجارية ومكتبية مرنة.', 'en' => 'Flexible retail and office spaces.'],
                'body' => ['ar' => 'مجمّع تجاري متعدّد الاستخدامات نُفّذ وفق جدول زمني صارم مع التزام كامل بمعايير السلامة.', 'en' => 'A mixed-use commercial complex delivered on a strict timeline with full adherence to safety standards.'],
            ],
            [
                'cat' => 'industrial', 'year' => 2023, 'is_featured' => true, 'sort_order' => 3,
                'title' => ['ar' => 'منشأة صناعية ومخازن', 'en' => 'Industrial Facility & Warehouses'],
                'location' => ['ar' => 'العاشر من رمضان', 'en' => '10th of Ramadan'],
                'summary' => ['ar' => 'مصنع ومخازن بمواصفات تشغيلية عالية.', 'en' => 'A factory and warehouses built to high operational specs.'],
                'body' => ['ar' => 'تنفيذ منشأة صناعية ومخازن تشمل الهياكل المعدنية والأرضيات الصناعية والأنظمة الكهروميكانيكية.', 'en' => 'Delivery of an industrial facility and warehouses including steel structures, industrial flooring, and electromechanical systems.'],
            ],
            [
                'cat' => 'infrastructure', 'year' => 2022, 'is_featured' => false, 'sort_order' => 4,
                'title' => ['ar' => 'تطوير طريق وشبكة مرافق', 'en' => 'Road & Utilities Development'],
                'location' => ['ar' => 'القاهرة', 'en' => 'Cairo'],
                'summary' => ['ar' => 'طرق وشبكات مرافق متكاملة.', 'en' => 'Integrated roads and utility networks.'],
                'body' => ['ar' => 'أعمال طرق وشبكات مياه وصرف وكهرباء نُفّذت وفق المعايير الفنية والبيئية.', 'en' => 'Roadworks and water, sewage, and electrical networks executed to technical and environmental standards.'],
            ],
        ];

        foreach ($projects as $p) {
            $cat = $p['cat'];
            unset($p['cat']);
            $p['project_category_id'] = $cats[$cat]->id;
            Project::create($p);
        }
    }

    private function seedVideos(): void
    {
        $company = VideoCategory::create(['title' => ['ar' => 'تعريفي', 'en' => 'Company'], 'sort_order' => 1]);
        VideoCategory::create(['title' => ['ar' => 'مشاريع', 'en' => 'Projects'], 'sort_order' => 2]);

        Video::create([
            'title' => ['ar' => 'فيديو تعريفي — نموذج (استبدله)', 'en' => 'Company intro — sample (replace me)'],
            'description' => ['ar' => 'فيديو نموذجي. ارفع فيديوهات UP Work على Vimeo واستبدل الـ ID من لوحة التحكم.', 'en' => 'Sample video. Upload UP Work videos to Vimeo and replace the ID from the dashboard.'],
            'vimeo_id' => '76979871',
            'video_category_id' => $company->id,
            'is_published' => true,
            'sort_order' => 1,
        ]);
    }

    private function seedGallery(): void
    {
        GalleryAlbum::create([
            'title' => ['ar' => 'من مشاريعنا', 'en' => 'From our projects'],
            'description' => ['ar' => 'لقطات من مواقع التنفيذ. ارفع الصور من لوحة التحكم.', 'en' => 'Shots from our project sites. Upload images from the dashboard.'],
            'is_published' => true,
            'sort_order' => 1,
        ]);
    }
}
