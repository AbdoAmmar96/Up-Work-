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
            'address' => ['ar' => 'القاهرة، مصر', 'en' => 'Cairo, Egypt'],
            'working_hours' => ['ar' => 'السبت – الخميس، 9 ص – 5 م', 'en' => 'Sat–Thu, 9am–5pm'],
            'social' => ['facebook' => '#', 'instagram' => '#', 'linkedin' => '#', 'youtube' => '#'],
            'colors' => ['primary' => '#1E40AF', 'accent' => '#F97316', 'dark' => '#1F2937', 'light' => '#E5E7EB'],
            'capabilities' => [
                ['ar' => 'مشاريع تسليم مفتاح', 'en' => 'Turnkey Projects'],
                ['ar' => 'أعمال مدنية', 'en' => 'Civil Works'],
                ['ar' => 'أعمال معدنية', 'en' => 'Steel Works'],
                ['ar' => 'كهروميكانيكا', 'en' => 'Electromechanical'],
                ['ar' => 'تشطيبات', 'en' => 'Finishing'],
                ['ar' => 'عزل', 'en' => 'Insulation'],
                ['ar' => 'حلول صناعية', 'en' => 'Industrial Solutions'],
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
                        'ar' => 'UP Work شركة متخصصة في الحلول الهندسية والمقاولات الحديثة، تقدّم خدمات متكاملة في مجالات الإنشاءات وإدارة المشاريع والبنية التحتية بأعلى معايير الجودة والاحترافية. نعتمد على فريق من المهندسين والخبراء لتقديم حلول عملية ومستدامة تلبّي احتياجات عملائنا وتواكب تطوّرات السوق الهندسي الحديث، ونسعى إلى بناء مستقبل أقوى من خلال الابتكار والدقّة والالتزام بتنفيذ المشاريع بكفاءة عالية وفي الوقت المحدّد.',
                        'en' => 'UP Work is a modern engineering and construction company delivering integrated solutions across construction, project management, and infrastructure development. We combine expertise, precision, and innovation to build projects that meet the highest standards of quality, safety, and professionalism — driven by a skilled team committed to sustainable developments and a stronger future for our clients and communities.',
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
                'key' => 'about_cta',
                'page' => 'about',
                'sort_order' => 3,
                'payload' => [
                    'title' => ['ar' => 'عندك مشروع في بالك؟', 'en' => 'Have a project in mind?'],
                    'text' => ['ar' => 'كلّمنا، ونحوّل فكرتك لخطّة تنفيذ واضحة بجدول وميزانية.', 'en' => 'Talk to us — we turn your idea into a clear execution plan with a timeline and a budget.'],
                    'cta' => ['ar' => 'كلّمنا', 'en' => 'Contact us'],
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
                'icon' => 'ti-building-skyscraper',
                'sort_order' => 1,
                'title' => ['ar' => 'المقاولات والإنشاءات', 'en' => 'Contracting & Construction'],
                'excerpt' => ['ar' => 'مبانٍ سكنية وتجارية ومنشآت صناعية ومخازن.', 'en' => 'Residential, commercial, and industrial buildings and warehouses.'],
                'body' => [
                    'ar' => 'ننفّذ مشاريع المقاولات للمباني السكنية والتجارية والمنشآت الصناعية والمخازن، من الأساسات حتى التشطيب، بفريق هندسي ومعدّات تضمن الجودة والالتزام بالمواعيد.',
                    'en' => 'We deliver contracting projects for residential and commercial buildings, industrial facilities, and warehouses — from foundations to finishing — with an engineering team and equipment that guarantee quality and on-time delivery.',
                ],
            ],
            [
                'icon' => 'ti-clipboard-check',
                'sort_order' => 2,
                'title' => ['ar' => 'إدارة المشاريع الهندسية', 'en' => 'Engineering Project Management'],
                'excerpt' => ['ar' => 'من التخطيط حتى التسليم، بجدول واضح وتحكّم في التكلفة.', 'en' => 'From planning to handover, with clear timelines and cost control.'],
                'body' => [
                    'ar' => 'ندير مشروعك من التخطيط والجدولة وحتى التسليم، مع تحكّم واضح في التكلفة والجودة والمخاطر، وتقارير دورية تبقيك على اطّلاع بكل خطوة.',
                    'en' => 'We manage your project from planning and scheduling through to handover — with clear control over cost, quality, and risk, and regular reporting that keeps you informed at every step.',
                ],
            ],
            [
                'icon' => 'ti-road',
                'sort_order' => 3,
                'title' => ['ar' => 'تطوير البنية التحتية', 'en' => 'Infrastructure Development'],
                'excerpt' => ['ar' => 'الطرق وشبكات المرافق التي تربط المدن.', 'en' => 'Roads and utility networks that connect cities.'],
                'body' => [
                    'ar' => 'نطوّر الطرق وشبكات المرافق التي تربط المدن وتؤسّس لنموٍّ مستدام، بتنفيذ يراعي المعايير الفنية والبيئية.',
                    'en' => 'We develop roads and utility networks that connect cities and lay the foundation for sustainable growth — executed to technical and environmental standards.',
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
