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
                'icon' => "layers",
                'sort_order' => 1,
                'title' => ['ar' => "أعمال التصميم", 'en' => "Design Works"],
                'excerpt' => ['ar' => "تصاميم هندسية دقيقة تترجم رؤيتك إلى مخططات تنفيذية.", 'en' => "Precise engineering designs that turn your vision into executable plans."],
                'body' => ['ar' => "نقدّم خدمات التصميم الهندسي المتكامل لمشاريع الإنشاءات والمنشآت الصناعية، بمخطّطات دقيقة تراعي الجودة والكفاءة والتكلفة.", 'en' => "We provide integrated engineering design services for construction and industrial projects — accurate plans that balance quality, efficiency and cost."],
                'items' => [
                    [
                        'slug' => "architectural-design",
                        'title' => ['ar' => "التصميم المعماري", 'en' => "Architectural Design"],
                        'body' => ['ar' => "نصمّم الواجهات والمساقط المعمارية بأسلوب عصري يوازن بين الجمال والوظيفة، مع مراعاة كفاءة المساحات ومتطلبات العميل والكود المصري للبناء.", 'en' => "We design facades and architectural layouts with a modern approach that balances aesthetics and function — optimizing space efficiency, client needs and building codes."],
                        'images' => ["/services/design-works/architectural-design-1.jpg", "/services/design-works/architectural-design-2.jpg", "/services/design-works/architectural-design-3.jpg"],
                    ],
                    [
                        'slug' => "structural-design",
                        'title' => ['ar' => "التصميم الإنشائي", 'en' => "Structural Design"],
                        'body' => ['ar' => "حسابات إنشائية دقيقة للخرسانة المسلّحة والمنشآت المعدنية تضمن الأمان وتحمّل الأحمال وفق أحدث الأكواد والمعايير الهندسية العالمية.", 'en' => "Accurate structural calculations for reinforced concrete and steel structures that guarantee safety and load capacity per the latest international engineering codes."],
                        'images' => ["/services/design-works/structural-design-1.jpg", "/services/design-works/structural-design-2.jpg", "/services/design-works/structural-design-3.jpg"],
                    ],
                    [
                        'slug' => "industrial-facilities-design",
                        'title' => ['ar' => "تصميم المنشآت الصناعية", 'en' => "Industrial Facilities Design"],
                        'body' => ['ar' => "تصميم متكامل للمصانع والمخازن والمنشآت الصناعية يشمل خطوط الإنتاج والمرافق والبنية التحتية بما يحقّق أعلى كفاءة تشغيلية.", 'en' => "Integrated design for factories, warehouses and industrial facilities — covering production lines, utilities and infrastructure for maximum operational efficiency."],
                        'images' => ["/services/design-works/industrial-facilities-design-1.jpg", "/services/design-works/industrial-facilities-design-2.jpg", "/services/design-works/industrial-facilities-design-3.jpg"],
                    ],
                    [
                        'slug' => "shop-drawings",
                        'title' => ['ar' => "المخططات التنفيذية", 'en' => "Shop Drawings"],
                        'body' => ['ar' => "مخططات تنفيذية تفصيلية وواضحة تسهّل التنفيذ في الموقع وتقلّل الأخطاء، مع تنسيق كامل بين كل التخصصات الهندسية.", 'en' => "Detailed, clear shop drawings that streamline on-site execution and reduce errors, with full coordination across all engineering disciplines."],
                        'images' => ["/services/design-works/shop-drawings-1.jpg", "/services/design-works/shop-drawings-2.jpg", "/services/design-works/shop-drawings-3.jpg"],
                    ],
                ],
            ],
            [
                'icon' => "building-skyscraper",
                'sort_order' => 2,
                'title' => ['ar' => "الأعمال المدنية", 'en' => "Civil Works"],
                'excerpt' => ['ar' => "أعمال التربة والخرسانات والعزل والتشطيبات.", 'en' => "Earth works, concrete, insulation and finishing."],
                'body' => ['ar' => "ننفّذ كامل الأعمال المدنية من الأساسات حتى التشطيب بفريق هندسي ومعدّات تضمن الجودة والالتزام بالمواعيد.", 'en' => "We carry out all civil works from foundations to finishing with an engineering team and equipment that guarantee quality and on-time delivery."],
                'items' => [
                    [
                        'slug' => "earth-works",
                        'title' => ['ar' => "أعمال التربة", 'en' => "Earth Works"],
                        'body' => ['ar' => "نبدأ كل مشروع من الموقع الأكثر تعقيدًا حتى مشروع الجسات الأساسي. نستخدم أحدث تقنيات الـ GPS والمعدّات لتنفيذ أعمال الحفر والردم والتسوية بدقّة وفي الموعد المحدّد وبأعلى معايير الأمان.", 'en' => "We start every project — from the most complex site to basic grading. We use the latest GPS technology and equipment to execute excavation, backfilling and leveling accurately, on schedule and with the highest safety standards."],
                        'images' => ["/services/civil-works/earth-works-1.jpg", "/services/civil-works/earth-works-2.jpg", "/services/civil-works/earth-works-3.jpg"],
                    ],
                    [
                        'slug' => "concrete-works",
                        'title' => ['ar' => "أعمال الخرسانات", 'en' => "Concrete Works"],
                        'body' => ['ar' => "نقدّم خدمات الخرسانة بكل أنواعها من الأساسات والقواعد حتى الأسقف والأعمدة، بخرسانة عالية الجودة ومعالجة سليمة تضمن متانة المنشأ على المدى الطويل.", 'en' => "We deliver concrete works of all kinds — from foundations and footings to slabs and columns — with high-quality concrete and proper curing that ensure long-term structural durability."],
                        'images' => ["/services/civil-works/concrete-works-1.jpg", "/services/civil-works/concrete-works-2.jpg", "/services/civil-works/concrete-works-3.jpg"],
                    ],
                    [
                        'slug' => "insulation-works",
                        'title' => ['ar' => "أعمال العزل", 'en' => "Insulation Works"],
                        'body' => ['ar' => "نقوم بتنفيذ جميع أنواع العزل (البيتومين – الإيبوكسي – اليوكريت) من أفضل الخامات والشركات المعتمدة، لحماية المنشآت من المياه والرطوبة وضمان عمر أطول.", 'en' => "We carry out all types of insulation (Bitumen – Epoxy – U-crate) from the best accredited materials and brands, protecting structures from water and moisture for a longer lifespan."],
                        'images' => ["/services/civil-works/insulation-works-1.jpg", "/services/civil-works/insulation-works-2.jpg", "/services/civil-works/insulation-works-3.jpg"],
                    ],
                    [
                        'slug' => "finishing-works",
                        'title' => ['ar' => "أعمال التشطيبات", 'en' => "Finishing Works"],
                        'body' => ['ar' => "ننفّذ جميع أعمال التشطيبات طبقًا لمتطلبات العميل وبما يتناسب مع التكاليف والتوقّعات والأذواق المختلفة، من الدهانات والأرضيات حتى أدقّ اللمسات النهائية.", 'en' => "We perform all finishing works per client requirements, balanced with cost, expectations and varied tastes — from paints and flooring to the finest final touches."],
                        'images' => ["/services/civil-works/finishing-works-1.jpg", "/services/civil-works/finishing-works-2.jpg", "/services/civil-works/finishing-works-3.jpg"],
                    ],
                ],
            ],
            [
                'icon' => "building",
                'sort_order' => 3,
                'title' => ['ar' => "الأعمال المعدنية", 'en' => "Steel Works"],
                'excerpt' => ['ar' => "هياكل معدنية وجمالونات وخزّانات وسايلوهات.", 'en' => "Steel structures, frames, storage tanks and silos."],
                'body' => ['ar' => "نصمّم وننفّذ الهياكل المعدنية والخزّانات والسايلوهات بأعلى جودة ومراقبة في كل خطوة من عملية التصنيع.", 'en' => "We design and build steel structures, tanks and silos with the highest quality and control at every step of the manufacturing process."],
                'items' => [
                    [
                        'slug' => "steel-structures",
                        'title' => ['ar' => "الهياكل المعدنية (جمالونات)", 'en' => "Steel Structures (Frames)"],
                        'body' => ['ar' => "تقدّم أب وورك جميع الحلول الإنشائية للجمالونات ذات المسافات الحرة، ما يجعلها الأفضل في مجال الجمالونات والمنشآت المعدنية مثل المخازن والهناجر ومناطق التخزين الذاتي، بتفاصيل دقيقة تضمن الحماية ومظهرًا جذّابًا لسنوات.", 'en' => "UP Work provides exceptional clear-span steel solutions — perfect for hangars, warehouses, arenas and self-storage areas — with near-fanatical attention to detail that adds weather protection and lasting attractive appearance."],
                        'images' => ["/services/steel-works/steel-structures-1.jpg", "/services/steel-works/steel-structures-2.jpg", "/services/steel-works/steel-structures-3.jpg"],
                    ],
                    [
                        'slug' => "crane-fabrication",
                        'title' => ['ar' => "تصنيع الأوناش", 'en' => "Crane Fabrication"],
                        'body' => ['ar' => "نصنّع الأوناش (الكرينات) بأي قدرة تحميل مطلوبة وفق مواصفات المشروع، بهياكل معدنية قوية وأنظمة حركة آمنة تخدم خطوط الإنتاج والمخازن.", 'en' => "We fabricate cranes of any required load capacity to project specs — with strong steel structures and safe motion systems serving production lines and warehouses."],
                        'images' => ["/services/steel-works/crane-fabrication-1.jpg", "/services/steel-works/crane-fabrication-2.jpg", "/services/steel-works/crane-fabrication-3.jpg"],
                    ],
                    [
                        'slug' => "storage-tanks",
                        'title' => ['ar' => "خزّانات التخزين", 'en' => "Storage Tanks"],
                        'body' => ['ar' => "نصنّع خزّانات التخزين بأنواعها (رأسي، أفقي، على عربة، على نصف مقطورة، تحت الأرض، أحادي ومزدوج الجدار) من الاستانلس والصلب والألومنيوم، مناسبة لكل استخدام.", 'en' => "We manufacture storage tanks of all types (vertical, horizontal, on-car, semi-trailer, underground, single & double jacket) in stainless steel, steel and aluminum — suited to every use."],
                        'images' => ["/services/steel-works/storage-tanks-1.jpg", "/services/steel-works/storage-tanks-2.jpg", "/services/steel-works/storage-tanks-3.jpg"],
                    ],
                    [
                        'slug' => "silos-tanks",
                        'title' => ['ar' => "السايلوهات والتنكات", 'en' => "Silos & Tanks"],
                        'body' => ['ar' => "تصنع أب وورك مجموعة متنوّعة ومميزة من السايلوهات لمختلف الاستخدامات وبيئات العمل، مع فريق مهندسين قادر على تصميم السايلو المناسب للمنتج مع مراقبة الجودة في كل خطوة.", 'en' => "UP Work manufactures a varied, distinctive range of silos for different applications and working environments — with an engineering team able to design the right silo for each product and quality control at every step."],
                        'images' => ["/services/steel-works/silos-tanks-1.jpg", "/services/steel-works/silos-tanks-2.jpg", "/services/steel-works/silos-tanks-3.jpg"],
                    ],
                ],
            ],
            [
                'icon' => "spark",
                'sort_order' => 4,
                'title' => ['ar' => "الأعمال الإلكتروميكانيكية", 'en' => "Electro-Mechanical Works"],
                'excerpt' => ['ar' => "تيار منخفض، تكييف، إنذار ومكافحة حريق، وسباكة.", 'en' => "Low current, HVAC, fire alarm & fighting, plumbing."],
                'body' => ['ar' => "ننفّذ كامل الأعمال الإلكتروميكانيكية بفريق متخصّص وحلول موثوقة تخدم المباني والمنشآت الصناعية.", 'en' => "We deliver complete electro-mechanical works with a specialized team and reliable solutions serving buildings and industrial facilities."],
                'items' => [
                    [
                        'slug' => "low-current",
                        'title' => ['ar' => "أعمال التيار المنخفض", 'en' => "Low Current Works"],
                        'body' => ['ar' => "نفّذ أنظمة التيار المنخفض من شبكات البيانات والمراقبة والتحكّم والصوت، بتصميم وتنفيذ احترافي يضمن كفاءة التشغيل وسهولة الصيانة.", 'en' => "We implement low-current systems — data networks, CCTV, access control and audio — with professional design and execution ensuring operational efficiency and easy maintenance."],
                        'images' => ["/services/electro-mechanical-works/low-current-1.jpg", "/services/electro-mechanical-works/low-current-2.jpg", "/services/electro-mechanical-works/low-current-3.jpg"],
                    ],
                    [
                        'slug' => "hvac",
                        'title' => ['ar' => "أعمال التكييف", 'en' => "HVAC Works"],
                        'body' => ['ar' => "تصميم وتنفيذ أنظمة التكييف والتهوية بكل أنواعها للمباني والمنشآت الصناعية، بما يضمن راحة حرارية وكفاءة في استهلاك الطاقة.", 'en' => "Design and execution of HVAC and ventilation systems of all types for buildings and industrial facilities — ensuring thermal comfort and energy efficiency."],
                        'images' => ["/services/electro-mechanical-works/hvac-1.jpg", "/services/electro-mechanical-works/hvac-2.jpg", "/services/electro-mechanical-works/hvac-3.jpg"],
                    ],
                    [
                        'slug' => "fire-fighting",
                        'title' => ['ar' => "الإنذار ومكافحة الحريق", 'en' => "Fire Alarm & Fire Fighting"],
                        'body' => ['ar' => "أنظمة إنذار ومكافحة حريق متكاملة وفق المعايير العالمية، تشمل الكشف المبكّر والرشّاشات والطفايات وشبكات الإطفاء لحماية الأرواح والممتلكات.", 'en' => "Integrated fire alarm and fire-fighting systems per international standards — including early detection, sprinklers, extinguishers and suppression networks to protect lives and property."],
                        'images' => ["/services/electro-mechanical-works/fire-fighting-1.jpg", "/services/electro-mechanical-works/fire-fighting-2.jpg", "/services/electro-mechanical-works/fire-fighting-3.jpg"],
                    ],
                    [
                        'slug' => "plumbing-drainage",
                        'title' => ['ar' => "الصرف الصحي والسباكة", 'en' => "Drainage & Plumbing"],
                        'body' => ['ar' => "ننفّذ أعمال الصرف الصحي والسباكة وشبكات المياه بمواد عالية الجودة وتنفيذ دقيق يمنع التسرّبات ويضمن أداءً موثوقًا على المدى الطويل.", 'en' => "We execute drainage, plumbing and water networks with high-quality materials and precise workmanship that prevents leaks and ensures reliable long-term performance."],
                        'images' => ["/services/electro-mechanical-works/plumbing-drainage-1.jpg", "/services/electro-mechanical-works/plumbing-drainage-2.jpg", "/services/electro-mechanical-works/plumbing-drainage-3.jpg"],
                    ],
                ],
            ],
            [
                'icon' => "trending-up",
                'sort_order' => 5,
                'title' => ['ar' => "الخدمات الهندسية", 'en' => "Engineering Services"],
                'excerpt' => ['ar' => "سيور نقل، أنظمة تخزين، طاولات رفع، وتركيب ماكينات.", 'en' => "Conveyors, racking, lift tables and machine installations."],
                'body' => ['ar' => "نوفّر خدمات هندسية متخصّصة لخطوط الإنتاج والمخازن من السيور وأنظمة التخزين حتى تركيب الماكينات.", 'en' => "We provide specialized engineering services for production lines and warehouses — from conveyors and racking to machine installations."],
                'items' => [
                    [
                        'slug' => "conveyors",
                        'title' => ['ar' => "السيور الناقلة", 'en' => "Conveyors"],
                        'body' => ['ar' => "نوفّر جميع أنواع السيور الناقلة: السير الحزامي، البكر الحرّة، السير الخفيف، السير المعياري (الموديولر)، سير البكر المحرّك، السير الحلزوني (Screw) والسلسلة، لكل تطبيقات النقل في خطوط الإنتاج.", 'en' => "We provide all conveyor types: belt, free rollers, light belt, modular belt, motorized roller, chevron, chain and screw conveyors — for every material-handling application on production lines."],
                        'images' => ["/services/engineering-services/conveyors-1.jpg", "/services/engineering-services/conveyors-2.jpg", "/services/engineering-services/conveyors-3.jpg"],
                    ],
                    [
                        'slug' => "racking-systems",
                        'title' => ['ar' => "أنظمة التخزين (راكينج)", 'en' => "Racking Systems"],
                        'body' => ['ar' => "أنظمة تخزين (راكينج) ثقيلة ومتوسطة وخفيفة مصمّمة لاستغلال المساحات الرأسية بكفاءة، تزيد سعة المخزن وتسهّل الوصول للبضائع بأمان.", 'en' => "Heavy, medium and light-duty racking systems designed to use vertical space efficiently — increasing storage capacity and enabling safe, easy access to goods."],
                        'images' => ["/services/engineering-services/racking-systems-1.jpg", "/services/engineering-services/racking-systems-2.jpg", "/services/engineering-services/racking-systems-3.jpg"],
                    ],
                    [
                        'slug' => "scissor-lift-tables",
                        'title' => ['ar' => "طاولات الرفع المقصية", 'en' => "Scissor Lift Tables"],
                        'body' => ['ar' => "طاولات رفع مقصية (سيزر) بأي قدرة تحميل وأبعاد منصّة وارتفاع عمل مطلوب، تخدم المناولة بين المستويات في المصانع والمخازن بأمان وكفاءة.", 'en' => "Scissor lift tables of any required capacity, platform dimensions and working height — serving inter-level material handling in factories and warehouses safely and efficiently."],
                        'images' => ["/services/engineering-services/scissor-lift-tables-1.jpg", "/services/engineering-services/scissor-lift-tables-2.jpg", "/services/engineering-services/scissor-lift-tables-3.jpg"],
                    ],
                    [
                        'slug' => "machine-installations",
                        'title' => ['ar' => "تركيب الماكينات", 'en' => "Machine Installations"],
                        'body' => ['ar' => "نقوم بتركيب جميع أنواع الماكينات وربطها بخطوط الإنتاج، مع المعايرة والتشغيل التجريبي لضمان تكامل المعدّات وكفاءة الإنتاج.", 'en' => "We install all types of machines and link them to production lines — including calibration and trial operation to ensure equipment integration and production efficiency."],
                        'images' => ["/services/engineering-services/machine-installations-1.jpg", "/services/engineering-services/machine-installations-2.jpg", "/services/engineering-services/machine-installations-3.jpg"],
                    ],
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
            'description' => ['ar' => 'فيديو نموذجي. ارفع فيديو من YouTube (الصق الرابط) أو ارفع ملفًا من لوحة التحكم.', 'en' => 'Sample video. Add a YouTube link or upload a file from the dashboard.'],
            'source' => 'youtube',
            'youtube_id' => 'dQw4w9WgXcQ',
            'thumbnail_url' => 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
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
